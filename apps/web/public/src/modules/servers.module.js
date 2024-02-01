export const serversModule = angular.module('servers',[])

.component('serversList', {
    templateUrl: '/partials/servers/list',
    controller:[
        'Server',
        'Task',
        'NotificationService',
        function(Server, Task, NotificationService){
            this.servers = Server.query();
            this.addTasks = function(){
                if(confirm('Вы хотите добавить задания?')){
                    Task.addRandom(function(){
                        NotificationService.showSuccess('Задания добавленны')
                    });
                } 
            }
            
    }]
})
.component('serversEdit', {
    templateUrl: '/partials/servers/edit',
    controller:[
        'Server',
        '$stateParams',
        '$state',
        'NotificationService',
        'Groups',
        function(Server, $stateParams, $state, NotificationService, Groups){
          this.groups = Groups.getGroups();
            if($stateParams.id){
                this.server = Server.get({id:$stateParams.id});
            }else{
                this.server = new Server();
            }
            this.save = function(){
                this.server.$save(function(){
                    NotificationService.showSuccess('Сервер сохранен')
                    $state.go('servers',{},{reload: true});
                })
            }
            
    }]
}).component('serversView', {
    templateUrl: '/partials/servers/view',
    controller:[
        'Server',
        '$stateParams',
        'NotificationService',
        'Charts',
        'Groups',
        function(Server, $stateParams, NotificationService, Charts, Groups){
            this.server = Server.get({id: $stateParams.id});
            this.charts = Charts.serverCharts({serverId: $stateParams.id});
            this.groups = Groups.getGroups()
            let self = this
            this.start = function(){
                if(confirm('Вы хотите запустить сервер?')){
                    this.server.$start(function(){
                        NotificationService.showSuccess('Сервер запущен')
                        self.server = Server.get({id: $stateParams.id});
                    })
                }
            }
            this.stop = function(){
                if(confirm('Вы хотите остановить сервер?')){
                    this.server.$stop(function(){
                        NotificationService.showSuccess('Сервер остановлен')
                        self.server = Server.get({id: $stateParams.id});
                    })
                }
            }
            this.restart = function(){
              if(confirm('Вы хотите перезапустить сервер?')){
                self.server.$restart(function(){
                  setTimeout(function(){
                    self.server.$start(function(){
                      NotificationService.showSuccess('Сервер запущен')
                      self.server = Server.get({id: $stateParams.id});
                  })
                  }, 3000)
                  NotificationService.showSuccess('Перезагрузка сервера')
                  self.server = Server.get({id: $stateParams.id});
                })
              }
            }
            this.delGroup = function(form) {

              Groups.delGroup({ id: form }, () => {
                NotificationService.showSuccess('Запись удалена');
              });

              Groups.getGroups((res) => {
                this.groups = res;
                NotificationService.showSuccess('Данные обновлены');
              });
            }
            this.addGroup = function(form) {
              if (form.$valid) {
                var groupName = this.group.name;
                var groupStatus = this.group.status;
              }
              if(confirm('Вы хотите создать группу?')){
                this.group = new Groups();
                this.group.$addGroup({name: groupName, status: groupStatus});
                NotificationService.showSuccess('Группа сохранена');
              }
              Groups.getGroups((res) => {
                this.groups = res;
                this.group.name = null;
                NotificationService.showSuccess('Данные обновлены');
              });
            };
            this.updateGroup = function(id) {
              
              var data = {
                id: id,
                name: this.group.name,
              }
                Groups.updateGroup(data, () => {
                  NotificationService.showSuccess('Название обновлено');
              });
                Groups.getGroups((res) => {
                  this.groups = res;
                  this.group.name = null;
                  NotificationService.showSuccess('Данные обновлены');
                });
            }
    }]

})
.directive('serverUserActionTable', [
      '$compile', 'dataTableLanguage', function($compile, dataTableLanguage) {
        return {
          restrict: 'A',
          scope: {
            'onDraw': '&',
            'filter': '<',
            'serverId': '<',
          },
          link: function(scope, element) {
            const dt = element.DataTable({ // eslint-disable-line new-cap
              ordering: false,
              searching: true,
              processing: true,
              serverSide: true,
              language: dataTableLanguage,
              ajax: '/journals/user-actions/' + scope.serverId,
              columns: [
                {
                  data: 'date',
                },
                {
                  data: 'user',
                },
                {
                  data: 'action',
                },
              ],
              order: [[0, 'desc']],
              createdRow: function(row, data) {
                const localScope = scope.$new(true);
                localScope.data = data;
                $compile(angular.element(row).contents())(localScope);
              },
            });
            dt.columns().every(function() {
              const that = this;
              $('input', this.header()).on('change', function() {
                if (that.search() !== $(this).val()) {
                  that.search($(this).val(), false, false).draw();
                }
              });
              $('select', this.header()).on('change', function() {
                if (that.search() !== $(this).val()) {
                  that.search($(this).val()).draw();
                }
              });
            });
            dt.on('draw', function() {
              scope.onDraw({params: dt.ajax.params()});
            });
          },
        };
      }]).directive('serverTasksTable', [
      '$compile', 'dataTableLanguage', function($compile, dataTableLanguage) {
        return {
          restrict: 'A',
          scope: {
            'onDraw': '&',
            'filter': '<',
            'serverId': '<',
          },
          link: function(scope, element) {
            const dt = element.DataTable({ // eslint-disable-line new-cap
              ordering: false,
              searching: true,
              processing: true,
              serverSide: true,
              language: dataTableLanguage,
              ajax: '/tasks/list/' + scope.serverId,
              columns: [
                {
                  data: 'date',
                },
                {
                  data: 'name',
                },
                {
                  data: 'completeDuration',
                },
                {
                  data: 'isComplete',
                  render:function(row,data,full){
                    return full.isComplete? 'Да': 'Нет';
                  },
                },
              ],
              order: [[0, 'desc']],
              createdRow: function(row, data) {
                const localScope = scope.$new(true);
                localScope.data = data;
                $compile(angular.element(row).contents())(localScope);
              },
            });
            dt.columns().every(function() {
              const that = this;
              $('input', this.header()).on('change', function() {
                if (that.search() !== $(this).val()) {
                  that.search($(this).val(), false, false).draw();
                }
              });
              $('select', this.header()).on('change', function() {
                if (that.search() !== $(this).val()) {
                  that.search($(this).val()).draw();
                }
              });
            });
            dt.on('draw', function() {
              scope.onDraw({params: dt.ajax.params()});
            });
          },
        };
      }])
      .component('tasksChart', {
        templateUrl: '/partials/servers/default-chart',
        bindings: {
          report: '<',
        },
        controller: [
          function() {
            this.$onInit = function() {
              this.chartParams = {
                type: 'bar',
                data: {
                  datasets: [
                    {
                      label: 'Выполненные',
                      data: this.report.complete,
                      backgroundColor: this.report.complete.map(function() {
                        return '#0000ff';
                      }),
                    },
                    {
                      label: 'Невыполненные',
                      data: this.report.notComplete,
                      backgroundColor: this.report.notComplete.map(function() {
                        return '#ff0000';
                      }),
                    },
                  ],
  
                  labels: this.report.labels,
                },
                options: {
                  responsive: true,
                  legend: {
                    display: false,
                    position: 'left',
                  },
                  scales: {
                    x: {
                      stacked: false,
                      beginAtZero: true,
                    },
                    y: {
                      stacked: false,
                      min: 0,
                    },
                  },
                },
  
              };
            };
          }],
      });