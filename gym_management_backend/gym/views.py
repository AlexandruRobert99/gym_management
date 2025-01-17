from .serializers import (ClientSerializer, SaliFitnessSerializer, AbonamenteSerializer,
                          AbonamenteSaliSerializer, AngajatiSerializer ,AngajatiSaliSerializer,
                          ClaseSerializer, RezervariClaseSerializer, ClaseSerializer, ParticipareClaseSerializer,
                          PlatiSerializer)
from rest_framework import status
from datetime import datetime, timedelta, date
from .models import (Clienti, SaliFitness, Abonamente, AbonamenteSali, Angajati, AngajatiSali,
                     Clase, RezervariClase, ParticipareClase, Plati)
from django.contrib.auth.hashers import make_password, check_password
import jwt
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now

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
            # Găsim utilizatorul în tabelul Clienti
            client = Clienti.objects.get(email=email)

            if not check_password(parola, client.parola):
                return Response({'error': 'Invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

            # Generăm JWT pentru client
            payload = {
                'id_client': client.id_client,
                'email': client.email,
                'exp': datetime.utcnow() + timedelta(days=1),
                'iat': datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            return Response({
                'token': token,
                'id_client': client.id_client,
                'nume': client.nume,
                'prenume': client.prenume,
                'email': client.email,
                'adresa': client.adresa,
                'telefon': client.telefon,
                'data_nasterii': client.data_nasterii,
                'data_inscrierii': client.data_inscrierii,
                'rol': 'client'
            }, status=status.HTTP_200_OK)

        except Clienti.DoesNotExist:
            try:
                # Dacă nu este client, verificăm dacă este angajat (manager)
                angajat = Angajati.objects.get(email=email)

                if not check_password(parola, angajat.parola):
                    return Response({'error': 'Invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

                # Generăm JWT pentru angajat
                payload = {
                    'id_angajat': angajat.id_angajat,
                    'email': angajat.email,
                    'functie': angajat.functie,
                    'exp': datetime.utcnow() + timedelta(days=1),
                    'iat': datetime.utcnow()
                }
                token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

                return Response({
                    'token': token,
                    'id_angajat': angajat.id_angajat,
                    'nume': angajat.nume,
                    'prenume': angajat.prenume,
                    'email': angajat.email,
                    'functie': angajat.functie,
                    'rol': 'manager'
                }, status=status.HTTP_200_OK)

            except Angajati.DoesNotExist:
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
    def get(self, request, pk):
        try:
            sala = SaliFitness.objects.get(pk=pk)
            serializer = SaliFitnessSerializer(sala)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SaliFitness.DoesNotExist:
            return Response({"error": "Sala Fitness not found"}, status=status.HTTP_404_NOT_FOUND)

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
        abonamente_sali = AbonamenteSali.objects.select_related('id_abonament', 'id_sala').all()
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
            abonament_sala = AbonamenteSali.objects.select_related('id_abonament', 'id_sala').get(pk=pk)
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
        detailed_data = []

        for entry in angajati_sali:
            detailed_data.append({
                'id': entry.id,
                'id_angajat': entry.id_angajat.id_angajat,
                'nume_angajat': f"{entry.id_angajat.prenume} {entry.id_angajat.nume}",
                'functie_angajat': entry.id_angajat.functie,
                'id_sala': entry.id_sala.id_sala,
                'nume_sala': entry.id_sala.nume_sala
            })

        return Response(detailed_data)



class AngajatiSaliDetail(APIView):
    def get(self, request, pk):
        try:
            angajat_sala = AngajatiSali.objects.get(pk=pk)
            detailed_data = {
                'id': angajat_sala.id,
                'id_angajat': angajat_sala.id_angajat.id_angajat,
                'nume_angajat': f"{angajat_sala.id_angajat.prenume} {angajat_sala.id_angajat.nume}",
                'functie_angajat': angajat_sala.id_angajat.functie,
                'id_sala': angajat_sala.id_sala.id_sala,
                'nume_sala': angajat_sala.id_sala.nume_sala
            }
            return Response(detailed_data)
        except AngajatiSali.DoesNotExist:
            return Response({"error": "Employee-Gym assignment not found"}, status=status.HTTP_404_NOT_FOUND)


class ClaseList(APIView):
    def get(self, request):
        clase = Clase.objects.all()
        clase_data = []

        for clasa in clase:
            # Obținem numele complet al antrenorului
            nume_antrenor = f"{clasa.id_antrenor.prenume} {clasa.id_antrenor.nume}" if clasa.id_antrenor else "Nespecificat"

            # Obținem numele sălii
            nume_sala = clasa.id_sala.nume_sala if clasa.id_sala else "Nespecificată"

            # Serializăm datele clasei și adăugăm informațiile suplimentare
            clasa_info = ClaseSerializer(clasa).data
            clasa_info['nume_antrenor'] = nume_antrenor
            clasa_info['nume_sala'] = nume_sala

            clase_data.append(clasa_info)

        return Response(clase_data)

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

            # Obținem numele antrenorului
            antrenor = clasa.id_antrenor
            nume_antrenor = f"{antrenor.prenume} {antrenor.nume}" if antrenor else "Fără antrenor"

            # Obținem numele sălii
            sala = clasa.id_sala
            nume_sala = sala.nume_sala if sala else "Fără sală"

            # Serializăm clasa
            serializer = ClaseSerializer(clasa)

            # Completăm răspunsul cu datele adiționale
            clasa_data = serializer.data
            clasa_data['nume_antrenor'] = nume_antrenor
            clasa_data['nume_sala'] = nume_sala

            return Response(clasa_data)

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



class InscriereClaseView(APIView):
    def post(self, request, pk):
        client_id = request.data.get('id_client')

        try:
            clasa = Clase.objects.get(pk=pk)
            client = Clienti.objects.get(pk=client_id)

            # Verificăm dacă clientul este deja înscris la această clasă
            inscris = RezervariClase.objects.filter(id_clasa=clasa, id_client=client).exists()
            if inscris:
                return Response({'error': 'Ești deja înscris la această clasă.'}, status=status.HTTP_400_BAD_REQUEST)

            # Verificăm dacă clasa este completă
            if clasa.numar_participanti >= clasa.capacitate_clasa:
                return Response({'error': 'Clasa este completă.'}, status=status.HTTP_400_BAD_REQUEST)

            # Creăm rezervarea și actualizăm numărul de participanți
            RezervariClase.objects.create(id_clasa=clasa, id_client=client, data_rezervare=datetime.now())
            clasa.numar_participanti += 1
            clasa.save()

            return Response({'message': 'Înscriere realizată cu succes!'}, status=status.HTTP_201_CREATED)

        except Clase.DoesNotExist:
            return Response({'error': 'Clasa nu a fost găsită.'}, status=status.HTTP_404_NOT_FOUND)
        except Clienti.DoesNotExist:
            return Response({'error': 'Clientul nu a fost găsit.'}, status=status.HTTP_404_NOT_FOUND)


class AnulareInscriereClaseView(APIView):
    def post(self, request, pk):
        client_id = request.data.get('id_client')

        try:
            clasa = Clase.objects.get(pk=pk)
            client = Clienti.objects.get(pk=client_id)

            # Verificăm dacă clientul este înscris la clasă
            rezervare = RezervariClase.objects.filter(id_clasa=clasa, id_client=client).first()
            if not rezervare:
                return Response({'error': 'Nu ești înscris la această clasă.'}, status=status.HTTP_400_BAD_REQUEST)

            # Ștergem rezervarea și actualizăm numărul de participanți
            rezervare.delete()
            clasa.numar_participanti -= 1
            clasa.save()

            return Response({'message': 'Înscriere anulată cu succes!'}, status=status.HTTP_200_OK)

        except Clase.DoesNotExist:
            return Response({'error': 'Clasa nu a fost găsită.'}, status=status.HTTP_404_NOT_FOUND)
        except Clienti.DoesNotExist:
            return Response({'error': 'Clientul nu a fost găsit.'}, status=status.HTTP_404_NOT_FOUND)


class PlatiList(APIView):
    def get(self, request):
        plati = Plati.objects.all()
        serializer = PlatiSerializer(plati, many=True)
        data = []

        for plata in plati:
            # Calcul zile ramase abonament
            data_expirare = plata.data_platii + timedelta(days=plata.id_abonament.valabilitate)
            zile_ramase = (data_expirare - now().date()).days
            zile_ramase = max(zile_ramase, 0)  # Dacă a expirat, returnăm 0

            # Adăugăm câmpul calculat în fiecare plată
            plata_data = PlatiSerializer(plata).data
            plata_data["zile_ramase_abonament"] = zile_ramase
            data.append(plata_data)

        return Response(data)

    def post(self, request):
        try:
            id_client = request.data.get('id_client')
            id_abonament = request.data.get('id_abonament')

            client = Clienti.objects.get(pk=id_client)
            abonament = Abonamente.objects.get(pk=id_abonament)

            plata = Plati.objects.create(
                suma=abonament.pret,
                data_platii=now().date(),
                id_abonament=abonament,
                id_client=client
            )

            serializer = PlatiSerializer(plata)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Clienti.DoesNotExist:
            return Response({"error": "Clientul nu există."}, status=status.HTTP_404_NOT_FOUND)
        except Abonamente.DoesNotExist:
            return Response({"error": "Abonamentul nu există."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



from django.utils.timezone import now
from datetime import timedelta

class PlatiDetail(APIView):
    def get(self, request, pk):
        try:
            plata = Plati.objects.get(pk=pk)
            serializer = PlatiSerializer(plata)

            # Calcul zile ramase abonament
            data_expirare = plata.data_platii + timedelta(days=plata.id_abonament.valabilitate)
            zile_ramase = (data_expirare - now().date()).days
            zile_ramase = max(zile_ramase, 0)  # Dacă a expirat, returnăm 0

            # Adăugăm câmpul calculat în răspuns
            data = serializer.data
            data["zile_ramase_abonament"] = zile_ramase

            return Response(data)

        except Plati.DoesNotExist:
            return Response({"error": "Plata nu a fost găsită."}, status=status.HTTP_404_NOT_FOUND)
