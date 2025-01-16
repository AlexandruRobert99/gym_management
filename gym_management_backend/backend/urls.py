"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from gym.views import (ClientList, ClientDetail, LoginView, LogoutView, SaliFitnessList,
                       SaliFitnessDetail, AbonamenteList, AbonamenteDetail, AbonamenteSaliList,
                       AbonamenteSaliDetail, AngajatiList, AngajatiDetail, AngajatiSaliList,
                       AngajatiSaliDetail, ClaseList, ClaseDetail,
                       )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clienti/', ClientList.as_view(), name='client-list'),
    path('api/clienti/<int:pk>/', ClientDetail.as_view(), name='client-detail'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/sali-fitness/', SaliFitnessList.as_view(), name='sali-fitness-list'),
    path('api/sali-fitness/<int:pk>/', SaliFitnessDetail.as_view(), name='sali-fitness-detail'),
    path('api/abonamente/', AbonamenteList.as_view(), name='abonamente-list'),
    path('api/abonamente/<int:pk>/', AbonamenteDetail.as_view(), name='abonamente-detail'),
    path('api/abonamente-sali/', AbonamenteSaliList.as_view(), name='abonamente-sali-list'),
    path('api/abonamente-sali/<int:pk>/', AbonamenteSaliDetail.as_view(), name='abonamente-sali-detail'),
    path('api/angajati/', AngajatiList.as_view(), name='angajati-list'),
    path('api/angajati/<int:pk>/', AngajatiDetail.as_view(), name='angajati-detail'),
    path('api/angajati-sali/', AngajatiSaliList.as_view(), name='angajati-sali-list'),
    path('api/angajati-sali/<int:pk>/', AngajatiSaliDetail.as_view(), name='angajati-sali-detail'),
    path('api/clase/', ClaseList.as_view(), name='clase-list'),
    path('api/clase/<int:pk>/', ClaseDetail.as_view(), name='clase-detail'),
]
