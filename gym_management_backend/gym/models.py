# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class SaliFitness(models.Model):
    id_sala = models.AutoField(primary_key=True)
    nume_sala = models.CharField(max_length=100, blank=True, null=True)
    adresa = models.TextField(blank=True, null=True)
    telefon = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    oras = models.CharField(max_length=50, blank=True, null=True)
    capacitate_sala = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'sali_fitness'


class Abonamente(models.Model):
    id_abonament = models.AutoField(primary_key=True)
    nume_abonament = models.CharField(max_length=100, blank=True, null=True)
    pret = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    valabilitate = models.IntegerField(blank=True, null=True)
    descriere = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'abonamente'


class Clienti(models.Model):
    id_client = models.AutoField(primary_key=True)
    nume = models.CharField(max_length=100, blank=True, null=True)
    prenume = models.CharField(max_length=100, blank=True, null=True)
    data_nasterii = models.DateField(blank=True, null=True)
    adresa = models.TextField(blank=True, null=True)
    telefon = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    data_inscrierii = models.DateField(blank=True, null=True)
    parola = models.CharField(max_length=128, null=False, blank=False)

    class Meta:
        db_table = 'clienti'


class Angajati(models.Model):
    id_angajat = models.AutoField(primary_key=True)
    nume = models.CharField(max_length=100, blank=True, null=True)
    prenume = models.CharField(max_length=100, blank=True, null=True)
    functie = models.CharField(max_length=50, blank=True, null=True)
    data_angajarii = models.DateField(blank=True, null=True)
    salariu = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    telefon = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    parola = models.CharField(max_length=128, null=False, blank=False)

    class Meta:
        db_table = 'angajati'



class Clase(models.Model):
    id_clasa = models.AutoField(primary_key=True)
    nume_clasa = models.CharField(max_length=100, blank=True, null=True)
    capacitate_clasa = models.IntegerField(blank=True, null=True)
    id_antrenor = models.ForeignKey(Angajati, models.SET_NULL, db_column='id_antrenor', blank=True, null=True)
    ora_incepere = models.TimeField(blank=True, null=True)
    ora_inchidere = models.TimeField(blank=True, null=True)
    data_clasa = models.DateField(blank=True, null=True)
    id_sala = models.ForeignKey('SaliFitness', models.CASCADE, db_column='id_sala', blank=True, null=True)

    class Meta:
        db_table = 'clase'


class AbonamenteClienti(models.Model):
    id_abonament_client = models.AutoField(primary_key=True)
    id_abonament = models.ForeignKey(Abonamente, models.CASCADE, db_column='id_abonament', blank=True, null=True)
    id_client = models.ForeignKey('Clienti', models.CASCADE, db_column='id_client', blank=True, null=True)
    data_incepere = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'abonamente_clienti'


class AbonamenteSali(models.Model):
    id_abonament = models.OneToOneField(Abonamente, models.CASCADE, db_column='id_abonament', primary_key=True)  # The composite primary key (id_abonament, id_sala) found, that is not supported. The first column is selected.
    id_sala = models.ForeignKey('SaliFitness', models.CASCADE, db_column='id_sala')

    class Meta:
        db_table = 'abonamente_sali'
        unique_together = (('id_abonament', 'id_sala'),)



class AngajatiSali(models.Model):
    id_angajat = models.OneToOneField(Angajati, models.CASCADE, db_column='id_angajat', primary_key=True)  # The composite primary key (id_angajat, id_sala) found, that is not supported. The first column is selected.
    id_sala = models.ForeignKey('SaliFitness', models.CASCADE, db_column='id_sala')

    class Meta:
        db_table = 'angajati_sali'
        unique_together = (('id_angajat', 'id_sala'),)


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)



class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class IntrariClientiSali(models.Model):
    id_intrare = models.AutoField(primary_key=True)
    id_client = models.ForeignKey(Clienti, models.CASCADE, db_column='id_client', blank=True, null=True)
    id_sala = models.ForeignKey('SaliFitness', models.CASCADE, db_column='id_sala', blank=True, null=True)
    data_intrare = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'intrari_clienti_sali'


class ParticipareClase(models.Model):
    id_clasa = models.OneToOneField(Clase, models.CASCADE, db_column='id_clasa', primary_key=True)  # The composite primary key (id_clasa, id_client, data_participare) found, that is not supported. The first column is selected.
    id_client = models.ForeignKey(Clienti, models.CASCADE, db_column='id_client')
    data_participare = models.DateField()

    class Meta:
        db_table = 'participare_clase'
        unique_together = (('id_clasa', 'id_client', 'data_participare'),)


class Plati(models.Model):
    id_plata = models.AutoField(primary_key=True)
    id_client = models.ForeignKey(Clienti, models.CASCADE, db_column='id_client', blank=True, null=True)
    id_abonament = models.ForeignKey(Abonamente, models.SET_NULL, db_column='id_abonament', blank=True, null=True)
    suma = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_platii = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'plati'


class RezervariClase(models.Model):
    id_rezervare = models.AutoField(primary_key=True)
    id_clasa = models.ForeignKey(Clase, models.CASCADE, db_column='id_clasa', blank=True, null=True)
    id_client = models.ForeignKey(Clienti, models.CASCADE, db_column='id_client', blank=True, null=True)
    data_rezervare = models.DateField()

    class Meta:
        db_table = 'rezervari_clase'



