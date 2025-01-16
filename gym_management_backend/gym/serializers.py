from rest_framework import serializers
from .models import (Clienti, SaliFitness, Abonamente, AbonamenteSali, Angajati,
                     AngajatiSali, Clase, RezervariClase, ParticipareClase)

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