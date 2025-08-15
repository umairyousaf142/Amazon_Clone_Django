from .models import *
from .serializers import *
from rest_framework import mixins
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class addProductView(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]

    queryset = addProduct.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)