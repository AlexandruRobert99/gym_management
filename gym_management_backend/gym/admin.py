from django.contrib import admin

# Register your models here.
from .models import Clienti

@admin.register(Clienti)
class ClientiAdmin(admin.ModelAdmin):
    list_display = ('nume', 'prenume', 'email', 'telefon')  # Afișează câmpurile în tabelul Admin
    search_fields = ('nume', 'prenume', 'email')  # Adaugă o bară de căutare
