from flask import Flask, render_template, url_for, request, redirect
import json
import edit_json as ej

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/rental')
def rental():
    with open('./static/events.json', 'r') as f:
        json_data = json.load(f)
    return render_template('rental.html', json_data=json_data)

@app.route('/rental_process', methods=['POST'])
@app.route('/rental_process/<ptype>', methods=['POST'])
def rental_process(ptype):
    msg = """
    <script>
        alert("{0}");
        location.replace("{1}");
    </script>
    """
    funcs = {
        "generate" : ej.addJson,
        "delete" : ej.deleteJson,
        "update" : ej.updateJson
    }

    if request.method != 'POST':
        return msg.format("ERROR: not POST method", url_for('rental'))

    if not ptype in funcs.keys():
        return msg.format("ERROR: unavailable ptype", url_for('rental'))

    
    success = funcs[ptype]('./static/events.json', dict(request.form))
    if not success:
        return msg.format("ERROR: invalid data", url_for('rental'))
    
    return msg.format("SUCCESS!", url_for('rental'))
    

if __name__ == "__main__":
    app.run(host="192.168.35.79", port=80, debug=True)
    #app.run(debug=True)
