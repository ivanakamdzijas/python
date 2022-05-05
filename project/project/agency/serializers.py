#from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from django.shortcuts import render

# Create your views here.

from datetime import date, timedelta
from rest_framework import viewsets, permissions, filters

from .models import Destinacija, Aranzman, Rezervacija, TipSmestaja, Prevoz, Smestaj, Slika, VrstaSmestaja,User



import schedule
import time


from rest_framework_jwt.serializers import JSONWebTokenSerializer

from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext as _
from rest_framework import serializers

from rest_framework_jwt.settings import api_settings

from rest_framework import serializers

from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer
#https://stackoverflow.com/questions/36910373/django-rest-auth-allauth-registration-with-email-first-and-last-name-and-witho


class MyRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }
#adapter ne moze bey ovog clean data, a serializer ne moze bey ovog save jer ima 2 param self i req
    #def save(self, request):
        #adapter = get_adapter()
        #user = adapter.new_user(request)
        #self.cleaned_data = self.get_cleaned_data()
        #adapter.save_user(request, user, self)
        #setup_user_email(request, user, [])
        #user.save()
        #return user

#class KorisnikSerializer(serializers.ModelSerializer):
    #class Meta:
        #model = Korisnik
        #fields = ['id', 'email', 'password','je_radnik_agencije', 'profil', ]
        #extra_kwargs={'password':{'write_only':True, 'required':True}}

#PRVA VERZIJA SERIALIZER ZA USERA
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ['id', 'email', 'password','is_staff', 'first_name', 'last_name', ]
        extra_kwargs={'password':{'write_only':True, 'required':True}}
        lookup_field = "email"
    #def create(self, validated_data):
        #user = User.objects.create_user(**validated_data)

        #return user



# user = User.objects.create_user(**validated_data)

# return user
#VODE IMAS ODLICNE STVARI ZA LITERATURU
#https://medium.com/analytics-vidhya/django-rest-api-with-json-web-token-jwt-authentication-69536c01ee18


class DestinacijaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destinacija
        fields = ['id', 'mesto', 'drzava']

class PrevozSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prevoz
        fields = ['id', 'vrsta_prevoza',]








class SlikaSerializer(serializers.ModelSerializer):
    #smestaj = SmestajSerializer()


    class Meta:
        model = Slika

        fields = ('slika',
                  'smestaj')

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.slika.url)

class VrstaSmestajaSerializer(serializers.ModelSerializer):

    class Meta:
        model = VrstaSmestaja
        fields=['id','vrsta_smestaja', 'broj_osoba',]
        #fields = '__all__'

class TipSmestajaSerializer(serializers.ModelSerializer):
    #smestaj = SmestajSerializer()

    #vrsta_smestaja = VrstaSmestajaSerializer()
    class Meta:
        model = TipSmestaja
        depth = 1
        fields=['id','smestaj', 'vrsta_smestaja','broj_dostupnih',]
        #fields = '__all__'

class SmestajSerializer(serializers.ModelSerializer):
    #destinacija = DestinacijaSerializer()
    #tipovi_smestaja = TipSmestajaSerializer(many = True)
    class Meta:
        model = Smestaj
        depth = 2
        fields=['id','destinacija','naziv', 'opis']

    #def create(self, validated_data):
     #   tipovi_smestaja_data = validated_data.pop('tipovi_smstaja')
      #  smestaj = Smestaj.objects.create(**validated_data)
       # for tip_data in tipovi_smestaja_data:
        #    TipSmestaja.objects.create(smestaj=smestaj,**tip_data)
       # return smestaj


class AranzmanSerializer(serializers.ModelSerializer):
    #tip_smestaja = TipSmestajaSerializer()
    tip_smestaja_id = serializers.PrimaryKeyRelatedField(queryset=TipSmestaja.objects.all(), source = 'tip_smestaja', write_only=True)
    class Meta:
        model = Aranzman
        depth = 4
        fields = [ 'cena',  'datum_polaska', 'datum_dolaska', 'tip_smestaja','tip_smestaja_id','broj_rezervacija','id']#'tip_smestaja'
        #fields = '__all__'
        




class RezervacijaSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)
    #ovo ne jer pravi novi aranzman od ovog i onda izadje greska vec postoji takav aranman
    #aranzman = AranzmanSerializer()


    class Meta:
        model = Rezervacija
        depth = 5
        fields = ['id','user','aranzman','aranzman_id','ukupan_iznos','placeno', 'prevoz','datum_rezervacije',]


