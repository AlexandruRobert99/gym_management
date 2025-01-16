from .serializers import (ClientSerializer, SaliFitnessSerializer, AbonamenteSerializer,
                          AbonamenteSaliSerializer, AngajatiSerializer ,AngajatiSaliSerializer,
                          ClaseSerializer, RezervariClaseSerializer, ClaseSerializer, ParticipareClaseSerializer)
from rest_framework import status
from datetime import datetime, timedelta, date
from .models import (Clienti, SaliFitness, Abonamente, AbonamenteSali, Angajati, AngajatiSali,
                     Clase, RezervariClase, ParticipareClase)
from django.contrib.auth.hashers import make_password, check_password
import jwt
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response

class ClientList(APIView):
    def get(self, request):
        clienti = Clienti.objects.all()
        serializer = ClientSerializer(clienti, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        if 'parola' in data:
            data['parola'] = make_password(data['parola'])  # Hash-uim parola înainte de salvare
        serializer = ClientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClientDetail(APIView):
    def put(self, request, pk):
        try:
            client = Clienti.objects.get(pk=pk)
            data = request.data
            if 'parola' in data:
                data['parola'] = make_password(data['parola'])  # Hash-uim parola
            serializer = ClientSerializer(client, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Clienti.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)



class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        parola = request.data.get('parola')

        if not email or not parola:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Găsim utilizatorul după email
            client = Clienti.objects.get(email=email)

            # Validăm parola criptată
            if not check_password(parola, client.parola):
                return Response({'error': 'Invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

            # Generăm JWT
            payload = {
                'id_client': client.id_client,
                'email': client.email,
                'exp': datetime.utcnow() + timedelta(days=1),
                'iat': datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            # Returnăm datele utilizatorului și token-ul
            return Response({
                'token': token,
                'id_client': client.id_client,
                'nume': client.nume,
                'prenume': client.prenume,
                'email': client.email,
                'adresa': client.adresa,
                'telefon': client.telefon,
                'data_nasterii': client.data_nasterii,
                'data_inscrierii': client.data_inscrierii
            }, status=status.HTTP_200_OK)

        except Clienti.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        request.session.flush()  # Șterge sesiunea curentă
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)

class SaliFitnessList(APIView):
    def get(self, request):
        sali_fitness = SaliFitness.objects.all()
        serializer = SaliFitnessSerializer(sali_fitness, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = SaliFitnessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SaliFitnessDetail(APIView):
    def put(self, request, pk):
        try:
            sala = SaliFitness.objects.get(pk=pk)
            data = request.data
            serializer = SaliFitnessSerializer(sala, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SaliFitness.DoesNotExist:
            return Response({"error": "Sala Fitness not found"}, status=status.HTTP_404_NOT_FOUND)

class AbonamenteList(APIView):
    def get(self, request):
        abonamente = Abonamente.objects.all()
        serializer = AbonamenteSerializer(abonamente, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AbonamenteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AbonamenteDetail(APIView):
    def get(self, request, pk):
        try:
            abonament = Abonamente.objects.get(pk=pk)
            serializer = AbonamenteSerializer(abonament)
            return Response(serializer.data)
        except Abonamente.DoesNotExist:
            return Response({"error": "Abonament not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            abonament = Abonamente.objects.get(pk=pk)
            serializer = AbonamenteSerializer(abonament, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Abonamente.DoesNotExist:
            return Response({"error": "Abonament not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            abonament = Abonamente.objects.get(pk=pk)
            abonament.delete()
            return Response({"message": "Abonament deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Abonamente.DoesNotExist:
            return Response({"error": "Abonament not found"}, status=status.HTTP_404_NOT_FOUND)


class AbonamenteSaliList(APIView):
    def get(self, request):
        abonamente_sali = AbonamenteSali.objects.all()
        serializer = AbonamenteSaliSerializer(abonamente_sali, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AbonamenteSaliSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AbonamenteSaliDetail(APIView):
    def get(self, request, pk):
        try:
            abonament_sala = AbonamenteSali.objects.get(pk=pk)
            serializer = AbonamenteSaliSerializer(abonament_sala)
            return Response(serializer.data)
        except AbonamenteSali.DoesNotExist:
            return Response({"error": "Subscription-Sala combination not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            abonament_sala = AbonamenteSali.objects.get(pk=pk)
            serializer = AbonamenteSaliSerializer(abonament_sala, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AbonamenteSali.DoesNotExist:
            return Response({"error": "Subscription-Sala combination not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            abonament_sala = AbonamenteSali.objects.get(pk=pk)
            abonament_sala.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except AbonamenteSali.DoesNotExist:
            return Response({"error": "Subscription-Sala combination not found"}, status=status.HTTP_404_NOT_FOUND)


class AngajatiList(APIView):
    def get(self, request):
        angajati = Angajati.objects.all()
        serializer = AngajatiSerializer(angajati, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        if 'parola' in data:
            data['parola'] = make_password(data['parola'])  # Hash-uim parola
        serializer = AngajatiSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AngajatiDetail(APIView):
    def get(self, request, pk):
        try:
            angajat = Angajati.objects.get(pk=pk)
            serializer = AngajatiSerializer(angajat)
            return Response(serializer.data)
        except Angajati.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            angajat = Angajati.objects.get(pk=pk)
            data = request.data
            if 'parola' in data:
                data['parola'] = make_password(data['parola'])  # Hash-uim parola
            serializer = AngajatiSerializer(angajat, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Angajati.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            angajat = Angajati.objects.get(pk=pk)
            angajat.delete()
            return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Angajati.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)


class AngajatiSaliList(APIView):
    def get(self, request):
        angajati_sali = AngajatiSali.objects.all()
        serializer = AngajatiSaliSerializer(angajati_sali, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AngajatiSaliSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AngajatiSaliDetail(APIView):
    def get(self, request, pk):
        try:
            angajat_sala = AngajatiSali.objects.get(pk=pk)
            serializer = AngajatiSaliSerializer(angajat_sala)
            return Response(serializer.data)
        except AngajatiSali.DoesNotExist:
            return Response({"error": "Employee-Gym assignment not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            angajat_sala = AngajatiSali.objects.get(pk=pk)
            serializer = AngajatiSaliSerializer(angajat_sala, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AngajatiSali.DoesNotExist:
            return Response({"error": "Employee-Gym assignment not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            angajat_sala = AngajatiSali.objects.get(pk=pk)
            angajat_sala.delete()
            return Response({"message": "Employee-Gym assignment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except AngajatiSali.DoesNotExist:
            return Response({"error": "Employee-Gym assignment not found"}, status=status.HTTP_404_NOT_FOUND)


class ClaseList(APIView):
    def get(self, request):
        clase = Clase.objects.all()
        serializer = ClaseSerializer(clase, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClaseDetail(APIView):
    def get(self, request, pk):
        try:
            clasa = Clase.objects.get(pk=pk)
            serializer = ClaseSerializer(clasa)
            return Response(serializer.data)
        except Clase.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            clasa = Clase.objects.get(pk=pk)
            serializer = ClaseSerializer(clasa, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Clase.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            clasa = Clase.objects.get(pk=pk)
            clasa.delete()
            return Response({"message": "Class deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Clase.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)