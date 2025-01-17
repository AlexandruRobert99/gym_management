from rest_framework import serializers
from .models import (Clienti, SaliFitness, Abonamente, AbonamenteSali, Angajati,
                     AngajatiSali, Clase, RezervariClase, ParticipareClase, Plati)
from django.utils.timezone import now
from datetime import timedelta

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clienti
        fields = '__all__'  # Include toate câmpurile din model


class SaliFitnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaliFitness
        fields = '__all__'

class AbonamenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abonamente
        fields = '__all__'


class AbonamenteSaliSerializer(serializers.ModelSerializer):
    abonament = AbonamenteSerializer(source='id_abonament', read_only=True)
    sala = SaliFitnessSerializer(source='id_sala', read_only=True)

    class Meta:
        model = AbonamenteSali
        fields = '__all__'

class AngajatiSerializer(serializers.ModelSerializer):

    class Meta:
        model = Angajati
        fields = '__all__'


class AngajatiSaliSerializer(serializers.ModelSerializer):
    class Meta:
        model = AngajatiSali
        fields = '__all__'


class ClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = '__all__'

class RezervariClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RezervariClase
        fields = '__all__'  # Include toate câmpurile


class ParticipareClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParticipareClase
        fields = '__all__'

class PlatiSerializer(serializers.ModelSerializer):
    abonament = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()
    zile_ramase_abonament = serializers.ReadOnlyField()

    class Meta:
        model = Plati
        fields = '__all__'

    def get_abonament(self, obj):
        return {
            "id_abonament": obj.id_abonament.id_abonament,
            "nume_abonament": obj.id_abonament.nume_abonament,
            "pret": str(obj.id_abonament.pret),
            "valabilitate": obj.id_abonament.valabilitate,
            "descriere": obj.id_abonament.descriere
        }

    def get_client(self, obj):
        return {
            "id_client": obj.id_client.id_client,
            "nume": obj.id_client.nume,
            "prenume": obj.id_client.prenume,
            "email": obj.id_client.email,
            "telefon": obj.id_client.telefon
        }

    def get_zile_ramase_abonament(self, obj):
        if obj.data_platii and obj.id_abonament:
            # Calculează data expirării abonamentului
            data_expirare = obj.data_platii + timedelta(days=obj.id_abonament.valabilitate)
            # Diferența dintre data expirării și data curentă
            zile_ramase = (data_expirare - now().date()).days
            return max(zile_ramase, 0)  # Dacă e negativ, returnează 0
        return 0