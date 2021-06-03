# from django.urls import path
# from .views import EmployeeAPIView, DetailEmployee, ExampleView, UserDetail, UserList

# urlpatterns = [
#     path('', EmployeeAPIView.as_view()),
#     path('detail/<int:pk>/', DetailEmployee.as_view()),
#     path('users/', UserList.as_view()),
#     path('users/<int:pk>/', UserDetail.as_view()),
#
# ]

from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import UserViewSet, EmployeeViewSet, current_user, UserList

router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]

# urlpatterns += router.urls
