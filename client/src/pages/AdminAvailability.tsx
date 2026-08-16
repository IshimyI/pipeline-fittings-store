import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import axiosInstance from "../axiosInstance";
import AddProductForm from "../components/AddProductForm";
import type { Category, Product, User } from "../types";

const isValidUrl = (str: string) => {
  const pattern = /^(https?:\/\/)/;
  return pattern.test(str);
};

const getImageUrl = (image: string | null | undefined) => {
  if (!image) return "/uploads/no-photo.png";
  if (isValidUrl(image)) return image;
  if (image.startsWith("/uploads/")) return image;
  if (image) {
    return `/uploads/categories/${image}.jpg`;
  }
  return "/uploads/no-photo.png";
};

interface AdminProduct extends Omit<Product, "price" | "availability"> {
  price: number;
  availability: number;
}

interface CategoryWithProducts extends Category {
  products: AdminProduct[];
}

interface AdminAvailabilityProps {
  user: User | null;
}

export default function AdminAvailability({ user }: AdminAvailabilityProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [quantityUpdates, setQuantityUpdates] = useState<
    Record<number, boolean>
  >({});

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [categoriesRes, productsRes] = await Promise.all([
        axiosInstance.get<Category[]>("/ListCategories"),
        axiosInstance.get<Product[]>("/ListProducts"),
      ]);

      const productsWithNumbers: AdminProduct[] = productsRes.data.map(
        (product) => ({
          ...product,
          availability: Number(product.availability) || 0,
          price: Number(product.price) || 0,
        })
      );

      setCategories(categoriesRes.data);
      setProducts(productsWithNumbers);
    } catch {
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQuantityChange = useCallback(
    async (productId: number, newQuantity: number) => {
      try {
        setQuantityUpdates((prev) => ({ ...prev, [productId]: true }));

        const numericValue = Number(newQuantity) || 0;

        await axiosInstance.post(`/changeProduct/${productId}`, {
          availability: numericValue,
          user: user,
        });

        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? { ...product, availability: numericValue }
              : product
          )
        );
      } catch {
        setError("Ошибка при обновлении количества");
      } finally {
        setQuantityUpdates((prev) => ({ ...prev, [productId]: false }));
      }
    },
    [user]
  );

  const filteredData = useMemo<CategoryWithProducts[]>(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const lowerProductQuery = searchProduct.toLowerCase();

    return categories
      .filter((category) =>
        category.name.toLowerCase().includes(lowerSearchQuery)
      )
      .map((category) => ({
        ...category,
        products: products
          .filter(
            (p) =>
              p.categoryId === category.id &&
              p.name.toLowerCase().includes(lowerProductQuery)
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter((category) => category.products.length > 0);
  }, [categories, products, searchQuery, searchProduct]);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Управление товарами</h1>
      <div>
        <AddProductForm onProductCreated={fetchData} user={user} />
      </div>

      <SearchControls
        searchQuery={searchQuery}
        searchProduct={searchProduct}
        onSearchChange={setSearchQuery}
        onProductSearchChange={setSearchProduct}
        categories={categories}
      />

      <ProductGrid>
        {filteredData.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onQuantityChange={handleQuantityChange}
            quantityUpdates={quantityUpdates}
          />
        ))}
      </ProductGrid>
    </div>
  );
}

const LoadingIndicator = () => (
  <div className="text-center p-8">Загрузка...</div>
);

const Error = ({ message }: { message: string }) => (
  <div className="text-red-500 p-8">{message}</div>
);

interface SearchControlsProps {
  searchQuery: string;
  searchProduct: string;
  onSearchChange: (value: string) => void;
  onProductSearchChange: (value: string) => void;
  categories: Category[];
}

const SearchControls = ({
  searchQuery,
  searchProduct,
  onSearchChange,
  onProductSearchChange,
  categories,
}: SearchControlsProps) => (
  <div className="mb-6 flex gap-4 flex-wrap">
    <input
      type="text"
      placeholder="Поиск по категориям"
      value={searchQuery}
      list="categories"
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1 p-2 rounded bg-gray-800 text-white"
    />
    <datalist id="categories">
      {categories.map((category) => (
        <option key={category.id} value={category.name} />
      ))}
    </datalist>
    <input
      type="text"
      placeholder="Поиск по товарам"
      value={searchProduct}
      onChange={(e) => onProductSearchChange(e.target.value)}
      className="flex-1 p-2 rounded bg-gray-800 text-white"
    />
  </div>
);

const ProductGrid = ({ children }: { children: ReactNode }) => (
  <section className="bg-gray-800 rounded-lg p-6">{children}</section>
);

interface CategorySectionProps {
  category: CategoryWithProducts;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  quantityUpdates: Record<number, boolean>;
}

const CategorySection = ({
  category,
  onQuantityChange,
  quantityUpdates,
}: CategorySectionProps) => (
  <div key={category.id} className="mb-8">
    <h2 className="text-center text-md md:text-2xl font-semibold break-words whitespace-normal">
      {category.name}
    </h2>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {category.products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onQuantityChange={onQuantityChange}
          quantityUpdates={quantityUpdates}
        />
      ))}
    </div>
  </div>
);

interface ProductItemProps {
  product: AdminProduct;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  quantityUpdates: Record<number, boolean>;
}

const ProductItem = ({
  product,
  onQuantityChange,
  quantityUpdates,
}: ProductItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(
    product.availability.toString()
  );

  useEffect(() => {
    setLocalQuantity(product.availability.toString());
  }, [product.availability]);

  const handleSave = () => {
    const numericValue = parseInt(localQuantity, 10) || 0;
    onQuantityChange(product.id, numericValue);
  };

  return (
    <div>
      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        className="w-full object-cover rounded-lg mb-3"
        onError={(e: SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = "/uploads/no-photo.png";
        }}
      />
      <h3 className="text-center text-sm md:text-xl font-semibold break-words whitespace-normal">
        {product.name}
      </h3>

      <ProductInfo
        localQuantity={localQuantity}
        setLocalQuantity={setLocalQuantity}
        onSave={handleSave}
        isUpdating={quantityUpdates[product.id]}
        currentQuantity={product.availability}
      />
    </div>
  );
};

interface ProductInfoProps {
  localQuantity: string;
  setLocalQuantity: (value: string) => void;
  onSave: () => void;
  isUpdating: boolean | undefined;
  currentQuantity: number;
}

const ProductInfo = ({
  localQuantity,
  setLocalQuantity,
  onSave,
  isUpdating,
  currentQuantity,
}: ProductInfoProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLocalQuantity(value);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center gap-2">
        <input
          type="text"
          value={localQuantity}
          onChange={handleChange}
          className="w-20 px-2 py-1 bg-gray-600 rounded text-white"
          disabled={isUpdating}
        />

        <button
          onClick={onSave}
          disabled={isUpdating}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:bg-gray-500"
        >
          {isUpdating ? "Сохранение..." : "Сохранить"}
        </button>

        <p className="text-sm text-gray-400">
          Текущее количество: {currentQuantity}
        </p>
      </div>
    </div>
  );
};
