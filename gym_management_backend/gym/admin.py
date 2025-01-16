from django.contrib import admin

# Register your models here.
from .models import Clienti, SaliFitness, Abonamente, AbonamenteSali, Angajati, AngajatiSali, Clase

@admin.register(Clienti)
class ClientiAdmin(admin.ModelAdmin):
    list_display = ('nume', 'prenume', 'email', 'telefon')  # Afișează câmpurile în tabelul Admin
    search_fields = ('nume', 'prenume', 'email')  # Adaugă o bară de căutare

@admin.register(SaliFitness)
class SaliFitnessAdmin(admin.ModelAdmin):
    list_display = ('nume_sala', 'adresa', 'oras', 'telefon', 'email', 'capacitate_sala')  # Afișează câmpurile în tabelul Admin
    search_fields = ('nume_sala', 'adresa', 'oras', 'email')  # Adaugă o bară de căutare

@admin.register(Abonamente)
class AbonamenteAdmin(admin.ModelAdmin):
    list_display = ('nume_abonament', 'pret', 'valabilitate', 'descriere')
    search_fields = ('nume_abonament', 'descriere')

@admin.register(AbonamenteSali)
class AbonamenteSaliAdmin(admin.ModelAdmin):
    list_display = ('id_abonament', 'id_sala')  # Afișează câmpurile principale
    search_fields = ('id_abonament__nume_abonament', 'id_sala__nume_sala')  # Adaugă căutare după nume

@admin.register(Angajati)
class AngajatiAdmin(admin.ModelAdmin):
    list_display = ('nume', 'prenume', 'functie', 'email', 'telefon', 'data_angajarii', 'salariu')  # Câmpurile afișate în tabel
    search_fields = ('nume', 'prenume', 'email', 'functie')  # Căutare după aceste câmpuri

@admin.register(AngajatiSali)
class AngajatiSaliAdmin(admin.ModelAdmin):
    list_display = ('id_angajat', 'id_sala')  # Afișăm ID-urile
    search_fields = ('id_angajat__nume', 'id_angajat__prenume', 'id_sala__nume_sala')  # Permitem căutare după numele angajaților și sălilor

@admin.register(Clase)
class ClaseAdmin(admin.ModelAdmin):
    list_display = ('nume_clasa', 'capacitate_clasa', 'id_antrenor', 'ora_incepere', 'ora_inchidere', 'data_clasa', 'id_sala')
    search_fields = ('nume_clasa', 'id_antrenor__nume', 'id_sala__nume_sala')