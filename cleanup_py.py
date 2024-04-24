import json
import re
from unicodedata import normalize

# Function to clean up dictionary entries
def clean_dictionary(dictionary):
    cleaned_dictionary = {}
    for key, value in dictionary.items():
        # Remove leading and trailing spaces from keys and values
        cleaned_key = key.strip()
        cleaned_value = value.strip()

        # Normalize accents in keys
        cleaned_key = normalize('NFD', cleaned_key)

        # Remove common articles from keys
        cleaned_key = re.sub(r'\b(le\s+|la\s+|les\s+|un\s+|une\s+|l\')', '', cleaned_key, flags=re.IGNORECASE)

        # Remove leading and trailing spaces again
        cleaned_key = cleaned_key.strip()

        # Update cleaned dictionary with cleaned key and value
        cleaned_dictionary[cleaned_key] = cleaned_value

    return cleaned_dictionary

# Path to the original dictionary JSON file
dictionary_file_path = 'Complete_dictionary_frtoeng.json'

# Path to save the cleaned dictionary JSON file
cleaned_dictionary_file_path = 'Cleaned_dictionary_frtoeng.json'

# Load the dictionary from the JSON file
with open(dictionary_file_path, 'r', encoding='utf-8') as file:
    dictionary = json.load(file)

# Clean up the dictionary
cleaned_dictionary = clean_dictionary(dictionary)

# Save the cleaned dictionary to a new JSON file
with open(cleaned_dictionary_file_path, 'w', encoding='utf-8') as file:
    json.dump(cleaned_dictionary, file, indent=2, ensure_ascii=False)

print(f'Cleaned dictionary saved to {cleaned_dictionary_file_path}')
