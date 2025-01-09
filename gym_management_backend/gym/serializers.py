from rest_framework import serializers
from .models import Clienti

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clienti
        fields = '__all__'  # Include toate câmpurile din model
