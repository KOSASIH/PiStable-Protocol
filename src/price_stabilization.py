import numpy as np
from sklearn.linear_model import LinearRegression

class PriceStabilization:
    def __init__(self):
        self.model = LinearRegression()
        self.history = []

    def update_price_history(self, price):
        self.history.append(price)
        if len(self.history) > 100:  # Keep only the last 100 prices
            self.history.pop(0)

    def predict_price(self):
        if len(self.history) < 2:
            return self.history[-1] if self.history else 0
        X = np.array(range(len(self.history))).reshape(-1, 1)
        y = np.array(self.history)
        self.model.fit(X, y)
        return self.model.predict([[len(self.history)]])[0]

    def adjust_supply(self, current_price, target_price):
        if current_price < target_price:
            # Logic to increase supply
            return "Increase supply"
        elif current_price > target_price:
            # Logic to decrease supply
            return "Decrease supply"
        return "Maintain supply"
