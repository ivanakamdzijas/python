"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token


from django.urls import include, path,re_path
from rest_framework import routers
from project.agency import views

from django.conf import settings
from django.conf.urls.static import static

from allauth.account.views import confirm_email
from django.conf.urls import url
from django.contrib import admin




# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [

    #path('', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    path('admin/', admin.site.urls),
    path('agencija/', include('project.agency.urls')),
#https://kraken.hr/blog/2020/custom-users-using-django-rest-framework
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),


    #Another point that worth mention is that the login and the signup views at rest_auth both
    # return the JWT Token and the logged user instance,so it saves you from one request to retrieve
    # user data after authenticating to the system.


    ##ovo RADIpath('rezervacije/',  views.RezervacijaViewSet.as_view({'get': 'list','post':'create'})),
    #re_path je resilo problem
    #re_path('rezervacije/(?P<pk>[\w]+)',  views.RezervacijaDetail.as_view()),
    #path('auth/users/',  views.UserViewSet.as_view({'get': 'list','post':'create'})),








]

urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
