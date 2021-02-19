from django.db.models import fields
from rest_framework import serializers
from app.models import Widget


class WidgetModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = '__all__'
