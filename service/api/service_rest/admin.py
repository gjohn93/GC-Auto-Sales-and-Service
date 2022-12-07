from django.contrib import admin
from .models import Technician, ServiceAppointment, SalesRecordVO, AutomobileVO
# Register your models here.
@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(ServiceAppointment)
class ServiceAppointmentAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesRecordVO)
class SaleRecordVOAdmin(admin.ModelAdmin):
    pass
