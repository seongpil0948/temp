from django.db.models import fields
from rest_framework import serializers
from app.models import Widget


class WidgetModelSerializer(serializers.ModelSerializer):
    # def post(self, request, format=None):
    #     serializer = MyObjectSerializer(data=request.data)
    #     if serializer.is_valid():
    #         instance, created = serializer.get_or_create()
    #         if not created:
    #             serializer.update(instance, serializer.validated_data)
    #         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    class Meta:
        model = Widget
        fields = '__all__'
