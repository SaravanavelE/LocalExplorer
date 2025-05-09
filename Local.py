import requests


API_KEY = "fsq3ZtmVTH4P1Nk6nuApsGrQtCwRYumVqj7lZRM39UXqNGY="
location = input()
limit = 5

search_url = f"https://api.foursquare.com/v3/places/search?near={location}&limit={limit}"

headers = {
    "Accept": "application/json",
    "Authorization": API_KEY
}

response = requests.get(search_url, headers=headers)
data = response.json()

print(f"\n📍 Top {limit} Places in {location}:\n")

for idx, place in enumerate(data["results"], start=1):
    name = place.get("name", "N/A")
    address = place["location"].get("formatted_address", "N/A")
    category = place["categories"][0]["name"] if place["categories"] else "N/A"

    print(f"🔹 {idx}. {name}")
    print(f"   📌 Address: {address}")
    print(f"   📂 Category: {category}\n")
