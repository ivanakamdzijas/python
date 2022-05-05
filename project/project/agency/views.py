from django.shortcuts import render

# Create your views here.

from datetime import date, timedelta
from rest_framework import viewsets, permissions, filters

from .serializers import DestinacijaSerializer, RezervacijaSerializer, AranzmanSerializer,   SmestajSerializer, SlikaSerializer, TipSmestajaSerializer,PrevozSerializer, VrstaSmestajaSerializer
from .models import Destinacija, Aranzman, Rezervacija, TipSmestaja, Prevoz, Smestaj, Slika, VrstaSmestaja, User
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.generics import get_object_or_404
from django_filters.rest_framework import  DjangoFilterBackend,OrderingFilter
from django_filters import FilterSet
from django_filters import rest_framework as filter
from django.db.models import Min

import schedule
import time, datetime
from django.utils import timezone
from datetime import datetime



from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

#class KorisnikView(APIView):
    #queryset = Korisnik.objects.all()
    #serializer_class = KorisnikSerializer

    #def get(self, request, *args, **kwargs):
        #data = JSONParser().parse(request)
        #serializer = KorisnikSerializer(data = data)
        #if(serializer.is_valid()):
            #email = serializer.data['email']
            #password = serializer.data['password']
            #korisnik = Korisnik.objects.filter(email = email).filter(password = password)
            #if korisnik.exists():
                #serializer = KorisnikSerializer(korisnik.first(), many = False)
        #return JsonResponse(serializer.data)

    #def post(self, request, *args, **kwargs):
        #return self.create(request, *args, **kwargs)
class AranzmanDetail(generics.RetrieveAPIView):
    queryset = Aranzman.objects.all()
    serializer_class = AranzmanSerializer


class DestinacijaDetail(generics.RetrieveAPIView):
    lookup_field = 'id'
    lookup_url_kwarg = 'id'
    queryset = Destinacija.objects.all()
    serializer_class = DestinacijaSerializer


class TipSmestajaFilter(FilterSet):
    smestaj = filter.CharFilter('smestaj__id')
    naziv = filter.CharFilter('smestaj__naziv')

    class Meta:
        model = TipSmestaja
        fields = ('smestaj', 'naziv',)


class TipSmestajaViewSet(viewsets.ModelViewSet):

    filter_backends = (DjangoFilterBackend,)
    filter_class = TipSmestajaFilter
    queryset = TipSmestaja.objects.all()
    serializer_class = TipSmestajaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]



class TipSmestajaDetail(generics.RetrieveAPIView):
    queryset = TipSmestaja.objects.all()
    serializer_class = TipSmestajaSerializer

class VrstaSmestajaFilter(FilterSet):
    smestaj = filter.CharFilter('tipsmestaja__smestaj__naziv')

    class Meta:
        model=VrstaSmestaja
        fields= ( "smestaj",)

class VrstaSmestajaViewSet(viewsets.ModelViewSet):
    queryset = VrstaSmestaja.objects.all()
    serializer_class = VrstaSmestajaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VrstaSmestajaFilter
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_field = "email"
    #zato što je potrebno : agencija/korisnici/example@gmail.com/
    lookup_value_regex = "[^/]+"

class DestinacijaFilter(FilterSet):
    mesto = filter.CharFilter('mesto')
    #smestaj = filter.CharFilter('aranzman__tip_smestaja__smestaj__naziv')

    class Meta:
        model = Destinacija
        fields = ("mesto", )


class DestinacijaViewSet(viewsets.ModelViewSet):
    queryset = Destinacija.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_class = DestinacijaFilter
    serializer_class = DestinacijaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PrevozViewSet(viewsets.ModelViewSet):
    queryset = Prevoz.objects.all()
    serializer_class = PrevozSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SmestajFilter(FilterSet):
    destinacija = filter.CharFilter('destinacija__mesto')
    naziv = filter.CharFilter('naziv')

    class Meta:
        model=Smestaj
        fields= ("destinacija","naziv",)


class SmestajViewSet(viewsets.ModelViewSet):
    queryset = Smestaj.objects.all()
    serializer_class = SmestajSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = SmestajFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SlikaFilter(FilterSet):
    smestaj = filter.CharFilter('smestaj__id')
    class Meta:
        model=Slika
        fields= ("smestaj",)


class SlikaViewSet(viewsets.ModelViewSet):
    queryset =Slika.objects.all()
    serializer_class = SlikaSerializer
    filter_backends = (DjangoFilterBackend,)  # SearchFilter,OrderingFilter,)
    filter_class = SlikaFilter
    #search_fields = ['smestaj__id', ]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class AranzmanFilter(FilterSet):
    datum_polaska = filter.CharFilter(method="filter_by_datum_polaska")
    broj_osoba = filter.CharFilter("tip_smestaja__vrsta_smestaja__broj_osoba")
    destinacija = filter.CharFilter('tip_smestaja__smestaj__destinacija__mesto')
    tip_id=filter.CharFilter('tip_smestaja__id')
    cena = filter.CharFilter(method="filter_by_cena")

    def filter_by_cena(self, queryset, name,value):
        if value == "200":
            queryset = queryset.filter(cena__lt=value)
        else:
            queryset = queryset.filter(cena__gte=value)
        return queryset;

    def filter_by_datum_polaska(self, queryset, name,value):
        queryset = queryset.filter(datum_polaska__gte=value)
        return queryset;

    class Meta:
        model=Aranzman
        fields= ("datum_polaska", "broj_osoba", "destinacija",'tip_id', "cena", )

class AranzmanViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    filter_class=AranzmanFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = AranzmanSerializer
    queryset =Aranzman.objects.filter(tip_smestaja__broj_dostupnih__gt=0,
                                         datum_polaska__gt=date.today()).order_by('cena')

#elif value == 1:
            #queryset = queryset.filter(cena__gt="200", cena__lte="400")
            #return queryset;
class AranzmanTop5ViewSet(viewsets.ModelViewSet):
    serializer_class = AranzmanSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Aranzman.objects.filter(tip_smestaja__broj_dostupnih__gt=0, 
                                        datum_polaska__gt=date.today()).order_by('-broj_rezervacija')[:5]


class LastMinFilter(FilterSet):
    popust = filter.CharFilter(method="filter_by_popust")

    def filter_by_popust(self, queryset, name,value):
        queryset = queryset.filter(datum_polaska__gt=date.today(),
                                    datum_polaska__lte=date.today()+timedelta(days=10))

        for aranzman in queryset:
            aranzman.cena -= aranzman.cena * (int(value)/100)
            aranzman.save()
        return queryset;

    class Meta:
        model=Aranzman
        fields= ( "popust", )


class AranzmanLastMin(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset =Aranzman.objects.filter(datum_polaska__gt=date.today(),
                                         datum_polaska__lte=date.today()+timedelta(days=10), 
                                         tip_smestaja__broj_dostupnih__gt=0)
    serializer_class = AranzmanSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = LastMinFilter








#class RezervacijaDetail(generics.RetrieveUpdateDestroyAPIView):

    #queryset = Rezervacija.objects.all()
    #serializer_class = RezervacijaSerializer






class RezervacijaFilter(FilterSet):
    user = filter.CharFilter('user')
    smestaj = filter.CharFilter('aranzman__tip_smestaja__smestaj__naziv')
    class Meta:
        model=Rezervacija
        fields= ("user",  "smestaj",)

class RezervacijaViewSet(viewsets.ModelViewSet):
    """
    Obezbeđuje CRUD operacije za model Rezervacija
    """
    filter_backends = (DjangoFilterBackend,)
    filter_class = RezervacijaFilter
    queryset = Rezervacija.objects.all().order_by('-id')
    serializer_class = RezervacijaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        aranzman_id = self.request.data['aranzman_id']
        prevoz_id = self.request.data['prevoz']
        aranzmani=Aranzman.objects.all();
        odabran_aranzman = get_object_or_404(aranzmani, pk=aranzman_id)
        
        if self.request.data['user'] == None:
            serializer.save(user=self.request.user, placeno=False,
                                prevoz_id=prevoz_id, aranzman_id=aranzman_id )

        else:
            print("izvrsiti rezervaciju za korisnika ",self.request.data['user'])
            user = get_object_or_404(User.objects.all(), pk = self.request.data['user'] )
            serializer.save(user=user, placeno=False,
                                prevoz_id=prevoz_id, aranzman_id=aranzman_id )
        
        odabran_aranzman.broj_rezervacija+=1
        odabran_aranzman.save()
        tip = odabran_aranzman.tip_smestaja
        tip.broj_dostupnih -= 1
        tip.save()
       
    def perform_destroy(self, serializer):
        print("podaci o aranžmanu koji se briše: ", serializer.aranzman)
        odabran_aranzman=serializer.aranzman
        odabran_aranzman.broj_rezervacija -= 1
        odabran_aranzman.save()
        tip = odabran_aranzman.tip_smestaja
        tip.broj_dostupnih += 1
        tip.save()
        serializer.delete()

    # def perform_update(self, serializer):
    # serializer.save(placeno=True)



 #arSerializer = AranzmanSerializer(ar)
        #print(arSerializer.data, " ar serializer")



