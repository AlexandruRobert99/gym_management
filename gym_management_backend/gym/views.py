from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Clienti
from .serializers import ClientSerializer

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

        try:
            client = Clienti.objects.get(email=email)
            if check_password(parola, client.parola):  # Verifică parola hash-uită
                return JsonResponse({"message": "Login successful!"}, status=200)
            else:
                return JsonResponse({"error": "Invalid password"}, status=400)
        except Clienti.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)