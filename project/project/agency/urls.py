from django.urls import path


from django.urls import include, path, re_path
from rest_framework import routers
from project.agency import views
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

router = routers.DefaultRouter()

router.register(r'destinacije', views.DestinacijaViewSet)
router.register(r'aranzmani', views.AranzmanViewSet)
router.register(r'top5', views.AranzmanTop5ViewSet)
router.register(r'popusti', views.AranzmanLastMin)
router.register(r'smestaji', views.SmestajViewSet)
router.register(r'tipovi_smestaja', views.TipSmestajaViewSet)
router.register(r'vrste_prevoza', views.PrevozViewSet)
router.register(r'vrste_smestaja', views.VrstaSmestajaViewSet)
router.register(r'rezervacije', views.RezervacijaViewSet)
router.register(r'slike', views.SlikaViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


#router.register(r'smestaj', views.SmestajDetail)
#router.register(r'tip', views.TipSmestajaDetail)

from django.conf.urls import url


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
