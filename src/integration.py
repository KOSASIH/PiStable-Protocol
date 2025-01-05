import requests

class Integration:
    def __init__(self, api_url):
        self.api_url = api_url

    def fetch_data(self, endpoint):
        response = requests.get(f"{self.api_url}/{endpoint}")
        return response.json()

    def send_data(self, endpoint, data):
        response = requests.post(f"{self.api_url}/{endpoint}", json=data)
        return response.status_code
