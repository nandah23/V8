from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class Usuario(AbstractUser):
	"""Usuario personalizado para el sistema RRHH.

	Extiende AbstractUser e incorpora los campos solicitados:
	- proceso: elección entre docencia, producción, servicio
	- area: FK a Area (nullable)
	- cargo: rol del usuario en el sistema (administrador, jefe_area, especialista_rrhh, empleado)
	- fecha_contratacion: fecha
	- correo: email (se mantiene además de email estándar)
	- sexo: M (Masculino) o F (Femenino)
	- edad: edad del usuario
	- categoria_docente: solo para usuarios con proceso=docencia
	"""

	PROCESO_DOCENCIA = 'docencia'
	PROCESO_PRODUCCION = 'produccion'
	PROCESO_SERVICIO = 'servicio'

	PROCESO_CHOICES = [
		(PROCESO_DOCENCIA, 'Docencia'),
		(PROCESO_PRODUCCION, 'Producción'),
		(PROCESO_SERVICIO, 'Servicio'),
	]

	SEXO_MASCULINO = 'M'
	SEXO_FEMENINO = 'F'

	SEXO_CHOICES = [
		(SEXO_MASCULINO, 'Masculino'),
		(SEXO_FEMENINO, 'Femenino'),
	]

	CATEGORIA_TITULAR = 'titular'
	CATEGORIA_AUXILIAR = 'auxiliar'
	CATEGORIA_ASISTENTE = 'asistente'
	CATEGORIA_INSTRUCTOR = 'instructor'

	CATEGORIA_CHOICES = [
		(CATEGORIA_TITULAR, 'Profesor Titular'),
		(CATEGORIA_AUXILIAR, 'Profesor Auxiliar'),
		(CATEGORIA_ASISTENTE, 'Profesor Asistente'),
		(CATEGORIA_INSTRUCTOR, 'Profesor Instructor'),
	]

	proceso = models.CharField(max_length=20, choices=PROCESO_CHOICES, null=True, blank=True)
	area = models.ForeignKey('area.Area', on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarios')

	CARGO_ADMIN = 'administrador'
	CARGO_JEFE_AREA = 'jefe_area'
	CARGO_ESPECIALISTA_RRHH = 'especialista_rrhh'
	CARGO_EMPLEADO = 'empleado'

	CARGO_CHOICES = [
		(CARGO_ADMIN, 'Administrador'),
		(CARGO_JEFE_AREA, 'Jefe de área'),
		(CARGO_ESPECIALISTA_RRHH, 'Especialista RRHH'),
		(CARGO_EMPLEADO, 'Empleado'),
	]

	cargo = models.CharField(max_length=30, choices=CARGO_CHOICES, default=CARGO_EMPLEADO)
	fecha_contratacion = models.DateField(null=True, blank=True)
	correo = models.EmailField(null=True, blank=True)

	sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, null=True, blank=True)
	edad = models.IntegerField(null=True, blank=True)
	categoria_docente = models.CharField(max_length=20, choices=CATEGORIA_CHOICES, null=True, blank=True)

	def clean(self):
		"""Validaciones a nivel de modelo."""
		# categoria_docente solo es válida si proceso=docencia
		if self.categoria_docente and self.proceso != self.PROCESO_DOCENCIA:
			raise ValidationError({'categoria_docente': 'La categoría docente solo es válida para usuarios con proceso de Docencia.'})

		# Si proceso=docencia, categoria_docente debe estar presente
		if self.proceso == self.PROCESO_DOCENCIA and not self.categoria_docente:
			raise ValidationError({'categoria_docente': 'La categoría docente es requerida para usuarios con proceso de Docencia.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def esta_jubilado(self):
		"""Retorna True si el usuario debe considerarse jubilado según su sexo y edad."""
		if not self.edad:
			return False
		if self.sexo == self.SEXO_FEMENINO and self.edad >= 60:
			return True
		if self.sexo == self.SEXO_MASCULINO and self.edad >= 65:
			return True
		return False

	def __str__(self):
		return f"{self.username} ({self.get_full_name()})"
