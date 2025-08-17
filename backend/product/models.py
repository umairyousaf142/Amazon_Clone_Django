# import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from cloudinary.models import CloudinaryField

class addProduct(models.Model):
    name = models.CharField(max_length=255)
    product_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    image = models.ImageField(upload_to='products')  
    price_cents = models.PositiveIntegerField()
    rating = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    rating_count = models.PositiveIntegerField()
    word = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Assuming 'word' is a keyword for the product

    def __str__(self):
        return self.name
    