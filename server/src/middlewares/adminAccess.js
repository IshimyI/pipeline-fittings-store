/**
 * Middleware для предоставления временного доступа администратора
 * Устанавливает res.locals.user как администратора без проверки токена
 */
function adminAccess(req, res, next) {
  // Устанавливаем res.locals.user с правами администратора
  res.locals.user = {
    isAdmin: true,
    // Другие свойства пользователя, которые могут понадобиться
  };

  next();
}

module.exports = adminAccess;
