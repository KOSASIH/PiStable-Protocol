import matplotlib.pyplot as plt

class Analytics:
    def __init__(self):
        self.data = []

    def record_data(self, value):
        self.data.append(value)

    def plot_data(self):
        plt.plot(self.data)
        plt.title("Transaction Data Over Time")
        plt.xlabel("Time")
        plt.ylabel("Value")
        plt.show()
