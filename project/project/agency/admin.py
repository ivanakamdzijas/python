import json

from django.contrib import admin

from django.contrib.auth.models import Group
from django.utils.safestring import mark_safe

from .models import Aranzman, Rezervacija, Smestaj, Destinacija, Prevoz, TipSmestaja, Slika, User,VrstaSmestaja
#from multiupload.admin import MultiUploadAdmin
from django.shortcuts import render, get_object_or_404
from django.conf.urls import url
from django.urls import reverse
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
#from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

admin.site.site_header='Online rezervacija turistickih aranzmana'



from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


class AranzmanAdmin(admin.ModelAdmin):
    model = Aranzman
    list_display = ('cena','datum_polaska', 'datum_dolaska','tip_smestaja', 'get_smestaj','broj_rezervacija',)
    list_filter = ('datum_polaska',)
    list_display_links = None
    
    def get_smestaj(self, obj):
        return obj.tip_smestaja.smestaj

    get_smestaj.admin_order_field = 'tip_smestaja__smestaj'
    get_smestaj.short_description = 'smestaj'


def placanje(self, request, queryset):
    queryset.update(placeno='True')
    self.message_user(request, "Uspesno je uneta uplata.")

class RezervacijaAdmin(admin.ModelAdmin):
    
    list_display = ('user', 'ukupan_iznos','placeno','prevoz',)
    actions = [placanje]
    list_filter = ('placeno',)
    list_display_links = None

class PrevozAdmin(admin.ModelAdmin):
    model = Prevoz
    list_display = ('vrsta_prevoza',)

class SmestajAdmin(admin.ModelAdmin):
    model = Smestaj
 ##   #readonly_fields = ('naziv','destinacija','tip_smestaja',)
    list_display = ('naziv','destinacija', 'opis','get_slike',)
    #readonly_fields = ('get_slike',)

    list_filter = ('naziv','destinacija',)
#ovo get slika get slike mi vraca samo prvu ili nista
    def get_slika(self, obj):
        print(obj.slika, "sl")
        #return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            #url=obj.slika.url,
            #width=obj.slika.width,
            #height=obj.slika.height,
        #)
        #)
        return mark_safe('<img src="{url}" width="150" height="150" />'.format(
         url=obj.slika.url,
         #width=obj.slika.width,
         #height=obj.slika.height,
         )
         )

    def get_slike(self, obj):
        slike = Slika.objects.filter(smestaj__id = obj.id)
        print(slike)
        for slika in slike:
            print(slika)
            return self.get_slika(slika)





   # get_slike.admin_order_field =   # Allows column order sorting
    get_slike.short_description = 'slike'

class SlikaAdmin(admin.ModelAdmin):
    model = Slika
    list_display = ('slika', 'smestaj', 'get_slika', )
    #ima ovo display links pa nema potrebe da bude i get_slika
    list_display_links = ('slika',)

    list_filter = ('smestaj',)
    def get_slika(self, obj):
        print(obj.slika, "sl")
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.slika.url,
            width=obj.slika.width,
            height=obj.slika.height,
        )
        )
class TipSmestajaAdmin(admin.ModelAdmin):
    model = TipSmestaja
    list_display = ('smestaj', )
    list_display_links = None

class DestinacijaAdmin(admin.ModelAdmin):
    model = Destinacija
    list_display = ('mesto','drzava',)
    list_display_links = None





admin.site.register(Smestaj,SmestajAdmin)
admin.site.register(Slika, SlikaAdmin)
admin.site.register(Rezervacija, RezervacijaAdmin)
admin.site.register(Aranzman, AranzmanAdmin)
admin.site.register(TipSmestaja, TipSmestajaAdmin)
admin.site.register(Destinacija, DestinacijaAdmin)
admin.site.register(Prevoz, PrevozAdmin)
admin.site.register(VrstaSmestaja)



