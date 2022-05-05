from django.db import models

# Create your models here.
from django.db import models
from datetime import date
from django.utils import timezone



from django_resized import ResizedImageField

#from django.contrib.auth.models import User

#OVO PROBAJ< DELUJE SUPER
#https://dev.to/raghavmalawat/custom-user-manager-django-rest-framework-5578
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, AbstractUser
import uuid


#https://www.fomfus.com/articles/how-to-use-email-as-username-for-django-authentication-removing-the-username
class UserManager(BaseUserManager):
    #"""Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        #"""Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email,  password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password,**extra_fields):
        #"""Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password,**extra_fields)


#napravila sam novog usera jer django savetuje da se napravi user, a ne da se koristi njihov,
#posto sam yelela da omogicim korisnicima da se loguju mejlom,
#morala sam da nasledim abstract user
class User(AbstractUser):
    """User model."""

    username = None
    email = models.EmailField(('email address'), unique=True)
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = 'user'

#class Korisnik(models.Model):
    #email = models.EmailField(unique=True, max_length=45, blank = True)
    #password = models.CharField(max_length=45, blank = True)
    #je_radnik_agencije = models.BooleanField(default=False)
    #profil = models.ForeignKey('Profil', models.DO_NOTHING)

    #class Meta:
        #db_table = 'korisnik'


#class Profil(models.Model):
    #ime = models.CharField(max_length=45, blank = True)
    #prezime = models.CharField(max_length=45, blank=True)
    #broj_telefona = models.CharField(max_length=45, blank=True)

    #class Meta:
        #db_table = 'profil'



class Destinacija(models.Model):
    drzava = models.CharField(max_length=30,blank=True, null=True)
    mesto = models.CharField(max_length=30, unique=True,blank=True, null=True)
    class Meta:
        verbose_name_plural = 'Destinacije'
        db_table = 'destinacija'

    def __str__(self):
        return self.mesto + ", " + self.drzava





class Smestaj(models.Model):
    naziv = models.CharField(max_length=30,blank=True, null=True)
    opis = models.CharField(max_length=500,blank=True, null=True)
    destinacija = models.ForeignKey(Destinacija, on_delete=models.CASCADE,blank=True, null=True)


    class Meta:
        verbose_name_plural = 'Smeštaji'
        db_table = 'smestaj'

    def __str__(self):
        return self.naziv

def upload_path(instance, filename):
    return '/'.join(['smeštaji', str(instance.smestaj.naziv) ,filename])

class Slika(models.Model):
    #slika =  models.ImageField(null=True, blank=True, upload_to=upload_path,height_field='image_height', width_field='image_width')
    slika = ResizedImageField(size=[500, 300], upload_to=upload_path, blank=True, null=True)
    #image_height = models.PositiveIntegerField(null=True, blank=True, editable=False, default="100")
    #image_width = models.PositiveIntegerField(null=True, blank=True, editable=False, default="100")
    smestaj = models.ForeignKey(Smestaj, on_delete=models.CASCADE, blank=True, null=True)


    def __str__(self):
        return self.smestaj.naziv + ", slika " + self.slika.name
    class Meta:
        verbose_name_plural= 'Slike'
        db_table = 'slika'
#smestajna jednica
class VrstaSmestaja(models.Model):
    vrsta_smestaja= models.CharField(max_length=30, unique=True,blank=True, null=True, verbose_name="vrsta smeštaja")
    broj_osoba = models.IntegerField(blank=True, null=True, verbose_name="predviđen broj osoba")

    def __str__(self):
        return self.vrsta_smestaja

    class Meta:
        verbose_name_plural = 'Vrste smeštaja'
        db_table = 'vrsta_smestaja'

class TipSmestaja(models.Model):
    vrsta_smestaja=models.ForeignKey(VrstaSmestaja, on_delete=models.CASCADE,blank=True, null=True)
    smestaj = models.ForeignKey(Smestaj, on_delete=models.CASCADE,blank=True, null=True)
    broj_dostupnih = models.IntegerField(blank=True, null=True, verbose_name="broj dostupnih smeštajnih jedinica")

    def __str__(self):
        return self.smestaj.naziv + ', ' + self.vrsta_smestaja.vrsta_smestaja

    class Meta:
        verbose_name_plural= 'Tipovi smeštaja'
        db_table = 'tip_smestaja'


class Aranzman(models.Model):

    #naziv = models.CharField(max_length=30, unique = True)
    cena = models.IntegerField(blank=True, null=True)
    #bolje da u tip smestaja pamtim yz odredjeni smestaj i  odabranu sj  koliko ima slobodnih mesta!
    #umesto broj dostupnih
    #broj_dostupnih = models.IntegerField(default=10, verbose_name="broj dostupnih smeštajnih jedinica")
    broj_rezervacija = models.IntegerField(default=0, blank=True, null=True, verbose_name="broj rezervacija")
    datum_polaska = models.DateField(blank=True, null=True, verbose_name='datum polaska')
    datum_dolaska = models.DateField(blank=True, null=True,verbose_name='datum dolaska')
    tip_smestaja=models.ForeignKey(TipSmestaja, on_delete=models.CASCADE,blank=True, null=True, verbose_name='tip smeštaja')


    class Meta:
        verbose_name_plural = 'Aranžmani'
        db_table = 'aranzman'

    def __str__(self):
        return self.tip_smestaja.vrsta_smestaja.vrsta_smestaja



class Prevoz(models.Model):
    vrsta_prevoza= models.CharField(max_length=30, unique=True, blank=True, null=True, verbose_name="vrsta prevoza")

    def __str__(self):
        return self.vrsta_prevoza

    class Meta:
        verbose_name_plural= 'Vrste prevoza'
        db_table = 'prevoz'



class Rezervacija(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, null=True, verbose_name='korisnik')
    aranzman= models.ForeignKey(Aranzman, on_delete=models.CASCADE, blank=True, null=True, verbose_name="aranžman")
    ukupan_iznos = models.FloatField(blank=True, null=True, verbose_name='ukupan iznos')
    placeno = models.BooleanField(blank=True, null=True, verbose_name='plaćeno')
    prevoz =models.ForeignKey(Prevoz, on_delete=models.CASCADE,blank=True, null=True, verbose_name='prevoz')
    datum_rezervacije = models.DateField(verbose_name='datum rezervacije',blank=True, null=True, default=date.today)

    class Meta:
        verbose_name_plural = 'Rezervacije'
        db_table = 'rezervacija'

    def __str__(self):
        return self.user.email
