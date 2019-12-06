file = open('kddcup.data', 'r')

try:
    data = file.readlines()
    for i in range(len(data)):
        data[i] = data[i].split(',')
finally:
    file.close()
