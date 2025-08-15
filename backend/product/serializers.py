from rest_framework import serializers
from .models import *

# class ProductSerializer(serializers.ModelSerializer):
#     image_url = serializers.SerializerMethodField()

#     class Meta:
#         model = addProduct
#         fields = '__all__'

#     def get_image_url(self, obj):
#         # Safely get the full Cloudinary URL of the image
#         if obj.image:
#             return obj.image.url
#         return None



class ProductSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    priceCents = serializers.IntegerField(source='price_cents')
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = addProduct
        fields = ['id', 'image', 'image_url', 'name', 'rating', 'priceCents', 'keywords']

    def get_image_url(self, obj):
        # Safely get the full Cloudinary URL of the image
        if obj.image:
            return obj.image.url
        return None

    def get_rating(self, obj):
        return {
            "stars": obj.rating_stars,
            "count": obj.rating_count
        }