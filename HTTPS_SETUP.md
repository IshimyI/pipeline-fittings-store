# HTTPS Implementation Guide for krioarmatura.ru

This guide will walk you through the process of setting up HTTPS for your krioarmatura.ru domain.

## Prerequisites
- Domain name (krioarmatura.ru) with A record pointing to your server IP
- SSH access to your server
- Docker and Docker Compose installed on your server

## Step 1: Install Certbot on Your Server

```bash
# Install snapd if not already installed
sudo apt update
sudo apt install snapd

# Install Certbot using snapd
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## Step 2: Generate SSL Certificates

Generate SSL certificates using the DNS challenge method:

```bash
sudo certbot certonly --manual --preferred-challenges=dns -d krioarmatura.ru -d www.krioarmatura.ru
```

During the process, Certbot will ask you to add TXT records to your domain's DNS configuration. Follow the instructions carefully and wait for the DNS changes to propagate before continuing.

## Step 3: Copy the Certificates to Your Project

After successful certificate generation, copy the certificates to your project:

```bash
# Create directory if it doesn't exist
mkdir -p ssl

# Copy certificates (adjust paths as needed)
sudo cp /etc/letsencrypt/live/krioarmatura.ru/privkey.pem ssl/
sudo cp /etc/letsencrypt/live/krioarmatura.ru/fullchain.pem ssl/

# Give proper permissions
sudo chmod 644 ssl/privkey.pem ssl/fullchain.pem
```

## Step 4: Build and Deploy Docker Images

Build your Docker images and push them to Docker Hub:

```bash
# Build the Docker image
docker build -t ishimyi/krioarmatura:latest --platform=linux/amd64 ./server

# Push the image to Docker Hub
docker push ishimyi/krioarmatura:latest
```

## Step 5: Deploy with Docker Compose

Deploy your application using Docker Compose:

```bash
# Start the application
docker-compose up -d

# Check logs
docker-compose logs -f server
```

## Step 6: Set Up Auto-Renewal for Certificates

Set up a cron job to automatically renew your certificates:

```bash
# Open crontab
sudo crontab -e

# Add this line to run renewal check twice daily
0 0,12 * * * certbot renew --quiet && docker-compose restart server
```

## Troubleshooting

If you encounter issues with HTTPS:

1. Verify that your certificates are correctly placed in the ssl directory
2. Check Docker logs: `docker-compose logs -f server`
3. Ensure your domain's DNS A record is correctly pointing to your server IP
4. Verify that ports 80 and 443 are open on your server's firewall

## Certificate Renewal

Let's Encrypt certificates are valid for 90 days. The cron job set up in Step 6 will automatically attempt renewal, but you should monitor to ensure it's working properly.

If you need to manually renew:

```bash
sudo certbot renew
```

After renewal, restart your Docker container:

```bash
docker-compose restart server
```