import sys
import joblib
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler, PolynomialFeatures

def main(revenue_category, year):
    try:
        year = int(year)

        model = joblib.load('tax_predictorV01.pkl')
        encoder = joblib.load('encoder.pkl')
        scaler = joblib.load('scaler.pkl')
        poly = joblib.load('poly.pkl')

        input_data = pd.DataFrame({
            'Year': [year],
            'Revenue category': [revenue_category]
        })

        input_encoded = encoder.transform(input_data[['Revenue category']])
        input_encoded_df = pd.DataFrame(input_encoded, columns=encoder.get_feature_names_out(['Revenue category']))
        input_final = pd.concat([input_data[['Year']].reset_index(drop=True), input_encoded_df], axis=1)
        input_final_scaled = scaler.transform(input_final)
        input_final_poly = poly.transform(input_final_scaled)

        predicted_value = model.predict(input_final_poly)
        
        print(predicted_value[0])

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python tax_model.py <revenue_category> <year>")
        sys.exit(1)
    
    revenue_category = sys.argv[1]
    year = sys.argv[2]
    main(revenue_category, year)
