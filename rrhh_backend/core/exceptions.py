from rest_framework.exceptions import APIException
from rest_framework import status


class DependencyError(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = "No se puede eliminar: hay registros dependientes."