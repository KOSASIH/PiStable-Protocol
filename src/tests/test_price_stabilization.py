import unittest
from price_stabilization import PriceStabilization

class TestPriceStabilization(unittest.TestCase):
    def setUp(self):
        self.ps = PriceStabilization()

    def test_predict_price(self):
        self.ps.update_price_history(100)
        self.ps.update_price_history(105)
        predicted = self.ps.predict_price()
        self.assertAlmostEqual(predicted, 105, delta=1)

    def test_adjust_supply(self):
        action = self.ps.adjust_supply(95, 100)
        self.assertEqual(action, "Increase supply")

if __name__ == '__main__':
    unittest.main()
