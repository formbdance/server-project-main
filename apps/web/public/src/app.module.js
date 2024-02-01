import stateConfig from './state.config';
import {serversModule} from './modules/servers.module';
import {NotificationService} from './modules/notification.service';
import {factoriesModule} from './factories/factories.module';

angular.module('test_project',[
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    serversModule.name,
    factoriesModule.name,
])
    .config(stateConfig)
    .service('NotificationService', NotificationService)
    .constant('dataTableLanguage', {
        'info': 'Показывается от _START_ до _END_ из _TOTAL_ записей',
        'decimal': '',
        'emptyTable': 'Нет данных по таблице',
        'infoEmpty': 'Показывается от 0 до 0 из 0 записей',
        'infoFiltered': '(Фильтрованно  из _MAX_ записей)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Показывать _MENU_ записей',
        'loadingRecords': 'Загрузка...',
        'processing': 'Загрузка...',
        'search': 'Поиск:',
        'zeroRecords': 'Не найдено записей',
        'paginate': {
          'first': 'Начало',
          'last': 'Конец',
          'next': 'Следующая',
          'previous': 'Предыдущая',
        },
        'aria': {
          'sortAscending': ': activate to sort column ascending',
          'sortDescending': ': activate to sort column descending',
        },
      })
      .directive('chart', function() {
        return {
          restrict: 'A',
          scope: {
            params: '<',
          },
          link: function(scope, element) {
            this.chart = new Chart(element.get(0), scope.params);
          },
        };
      });