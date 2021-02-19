from rest_framework import routers
from django.urls import path, include
from app.views import WidgetViewSet
from app.views import from_cafe


app_name = 'insa'

router = routers.DefaultRouter()
router.register(r'widget', WidgetViewSet, basename='widgets')
urlpatterns = [
    path('', include(router.urls)),
    path('from_cafe/', from_cafe),
] + router.urls
