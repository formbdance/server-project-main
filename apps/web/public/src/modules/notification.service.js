
export class NotificationService {
  showNotification(text, params) {
    $.jGrowl(text, params);
  }

  showSuccess(text) {
    this.showNotification(
        text,
        {
          header: 'Выполнено',
          theme: 'success',
          life: 5000,
        },
    );
  }

  showError(text) {
    this.showNotification(
        text,
        {
          header: 'Ошибка',
          theme: 'error',
          life: 20000,
        },
    );
  }
}
