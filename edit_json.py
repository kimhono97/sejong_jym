import json

def addJson(file, data):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        new = {}
        
        new['id'] = -1
        for d in json_data:
            d_id = int(d['id'])
            if new['id'] < d_id:
                new['id'] = d_id
        new['id'] += 1

        new['title'] = data['title'].strip()
        date = "{0:0>4}-{1:0>2}-{2:0>2}"
        date = date.format(data['yyyy'], data['mm'], data['dd'])
        date += "T{0:0>2}:{1:0>2}:00"
        new['start'] = date.format(data['sh'], data['sm'])
        new['end'] = date.format(data['eh'], data['em'])
        tmp = {}
        tmp['chief'] = data['chief'].strip()
        tmp['people'] = int(data['person'])
        tmp['outsider'] = (not 'outsider' in data.keys())
        tmp['note'] = data['note']
        new['extendedProps'] = tmp

        json_data.append(new)

        with open(file, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent="\t")
    except:
        return False
    return True

def deleteJson(file, data):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        
        target_id = int(data['id'])
        idx = -1
        for i, v in enumerate(json_data):
            if target_id == int(v['id']):
                idx = i
                break
        json_data = json_data[:idx] + json_data[idx+1:]

        with open(file, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent="\t")
    except:
        return False
    return True

def updateJson(file, data):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        
        target_id = int(data['id'])
        target = {}
        for i, v in enumerate(json_data):
            if target_id == int(v['id']):
                v['title'] = data['title'].strip()
                date = "{0:0>4}-{1:0>2}-{2:0>2}"
                date = date.format(data['yyyy'], data['mm'], data['dd'])
                date += "T{0:0>2}:{1:0>2}:00"
                v['start'] = date.format(data['sh'], data['sm'])
                v['end'] = date.format(data['eh'], data['em'])
                tmp = v['extendedProps']
                tmp['chief'] = data['chief'].strip()
                tmp['people'] = int(data['person'])
                tmp['outsider'] = (not 'outsider' in data.keys())
                tmp['note'] = data['note']
                break

        with open(file, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent="\t")
    except:
        return False
    return True

if __name__ == "__main__":
    d = {}
    d['title'] = "Repeating Event"
    d['chief'] = "Admin"
    d['person'] = "3"
    d['outsider'] = "on"
    d['yyyy'] = "2020"
    d['mm'] = "3"
    d['dd'] = "10"
    d['sh'] = "16"
    d['sm'] = "0"
    d['eh'] = "16"
    d['em'] = "0"
    d['note'] = ""
    d['id'] = ""

    with open('./test.json', 'w', encoding='utf-8') as f:
        dd = d.copy()
        dd['id'] = 123
        json.dump([], f, indent="\t")
    
    addJson('./test.json', d)
