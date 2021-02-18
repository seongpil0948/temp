from django.shortcuts import render
from rest_framework import status, viewsets, filters, mixins
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['GET', 'POST'])
def from_cafe(request):
    print(request.data.get('msg', 'key msg not exist '))    
    return Response("잘 받았습니다", status=status.HTTP_200_OK)
