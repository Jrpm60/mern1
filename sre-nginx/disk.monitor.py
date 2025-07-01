import shutil

print(shutil.disk_usage("/"))

total, free, used = shutil.disk_usage("/")

usage_perc = (used / total) * 100
# print(usage_perc)
print(f"El porcentaje de uso es: {usage_perc:.2f}%")

# ---------------------------------
# copiar archivos de : a
src = 'access.log'

# Destination file path
dst = 'backup/access.log'

try:
    # Copiar el archivo
    shutil.copy(src, dst)
    print("File copied successfully!")

except Exception as e:
    print("Error ", e)