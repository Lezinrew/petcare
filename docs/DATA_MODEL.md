# Modelo de Dados — PetCare Responsável

## AnimalBreed

Coleção: `animals` — **132** registros no seed (13 espécies).

Valores de `species`: `dog`, `cat`, `fish`, `hamster`, `bird`, `rabbit`, `turtle`, `twister`, `guinea_pig`, `chinchilla`, `gerbil`, `ferret`, `lizard`.

```json
{
  "slug": "labrador-retriever",
  "species": "dog",
  "name": "Labrador Retriever",
  "origin": "Canadá",
  "originalFunction": "Cão de trabalho, caça e resgate",
  "lifeExpectancy": "10 a 12 anos",
  "size": "grande",
  "energyLevel": "alto",
  "apartmentFriendly": true,
  "goodWithChildren": true,
  "shortDescription": "Amigável, inteligente e leal...",
  "imageUrl": "/images/dogs/labrador-retriever.webp",
  "imageAlt": "Labrador Retriever",
  "imageCredit": "Imagem ilustrativa",
  "imageSource": "Acervo do projeto",
  "placeholderUrl": "/images/placeholders/dog.svg",
  "care": {
    "feeding": {
      "dailyAmount": "2% a 3% do peso corporal",
      "mealsPerDay": "2 refeições",
      "forbiddenFoods": ["chocolate", "uvas"],
      "specialNeeds": "dieta balanceada rica em proteínas"
    },
    "hydration": { "waterAmount": "50 a 100 ml/kg/dia", "dehydrationSigns": ["gengivas secas"] },
    "exercise": { "dailyWalkTime": "1 a 2 horas", "energyLevel": "alto", "recommendedActivities": ["natação"] },
    "health": { "idealWeight": "machos 29-36 kg", "vaccines": ["V8/V10"], "commonDiseases": ["displasia"] },
    "hygiene": { "bathFrequency": "30-45 dias", "coatCare": "escovação semanal" },
    "behavior": { "temperament": "dócil", "trainability": "alta", "sociability": "muito sociável", "otherAnimals": "geralmente compatível" },
    "environment": { "recommendedSpace": "médio a grande", "canLiveInApartment": "sim, com exercícios", "climateSensitivity": "sensível ao calor", "backyardNeed": "desejável" },
    "growth": { "adultSize": "56-62 cm", "adultAge": "12-18 meses" },
    "curiosities": ["Origem no Canadá século XIX"]
  }
}
```

### Campos de imagem

| Campo | Exemplo | Descrição |
|-------|---------|-----------|
| `imageUrl` | `/images/cats/persa.webp` | Foto real (`.webp`) |
| `imageAlt` | `Persa` | Texto alternativo |
| `imageCredit` | `Imagem ilustrativa` | Crédito exibido na ficha |
| `imageSource` | `Acervo do projeto` | Fonte da imagem |
| `placeholderUrl` | `/images/placeholders/cat.svg` | SVG quando `.webp` ausente |

Preenchidos automaticamente em `allBreeds.ts` via `withImageFields()`.

## PetProfile

Coleção: `pets`

Valores de `species`: `dog`, `cat`, `fish`, `hamster`, `bird`, `rabbit`, `turtle`, `twister`, `guinea_pig`, `chinchilla`, `gerbil`, `ferret`, `lizard`, `other`.

```json
{
  "userId": "demo-user",
  "name": "Thor",
  "species": "dog",
  "breedSlug": "labrador-retriever",
  "ageMonths": 24,
  "weightKg": 30,
  "sex": "male",
  "neutered": true,
  "notes": "Adotado em 2024",
  "photoUrl": null
}
```

## TutorProfile

Coleção: `tutorprofiles` — um documento por `userId` (usuário demo no MVP).

```json
{
  "userId": "demo-user",
  "name": "Ana",
  "city": "São Paulo",
  "state": "SP",
  "housingType": "apartment",
  "petExperience": "some",
  "notes": "Primeiro apartamento com pet."
}
```

Valores de `housingType`: `apartment`, `house`, `house_with_yard`, `other`.

Valores de `petExperience`: `none`, `some`, `experienced`.

Pets e lembretes compartilham o mesmo `userId` do tutor demo, preparando multi-usuário futuro sem autenticação real no MVP.

## Reminder

Coleção: `reminders`

```json
{
  "userId": "demo-user",
  "petId": "507f1f77bcf86cd799439011",
  "type": "vaccine",
  "title": "Vacina V10",
  "dueDate": "2026-07-01",
  "recurrence": "yearly",
  "status": "pending"
}
```

## AdoptionMatchRequest

Body do POST `/api/adoption/match` (não persistido):

```json
{
  "housing": "apartment",
  "hasBackyard": false,
  "hasChildren": true,
  "hasOtherPets": false,
  "experienceLevel": "none",
  "freeTimePerDay": "low",
  "canWalkDaily": true,
  "preferredSize": "médio",
  "likesActivePets": false
}
```

## AdoptionMatchResult

Resposta do POST `/api/adoption/match`:

```json
{
  "profile": "Tutor iniciante em apartamento",
  "recommendedBreeds": [
    {
      "name": "Shih Tzu",
      "slug": "shih-tzu",
      "imageUrl": "/images/dogs/shih-tzu.webp",
      "imageAlt": "Shih Tzu",
      "compatibilityScore": 88,
      "compatibilityLabel": "Alta compatibilidade",
      "reason": "Adaptável a apartamento. Energia moderado, adequada ao seu perfil.",
      "attentionPoints": ["Confirme rotina, custos e temperamento individual antes da decisão."]
    }
  ],
  "responsibilityAlerts": ["Reserve tempo diário para passeios"],
  "antiAbandonmentMessage": "Adotar é assumir uma vida..."
}
```
