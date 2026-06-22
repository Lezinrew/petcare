# API — PetCare Responsável

Base URL: `http://localhost:3333/api`

## Health

### GET /api/health

**Descrição:** Verifica se a API está online.

**Response 200:**
```json
{
  "status": "ok",
  "service": "petcare-api",
  "version": "0.1.0"
}
```

---

## Animals

Endpoints por espécie (mesmos query params de filtros onde aplicável):

| Método | URL | Qtd esperada |
|--------|-----|--------------|
| GET | `/api/animals/dogs` | 30 |
| GET | `/api/animals/cats` | 20 |
| GET | `/api/animals/fish` | 10 |
| GET | `/api/animals/hamsters` | 5 |
| GET | `/api/animals/birds` | 23 |
| GET | `/api/animals/rabbits` | 8 |
| GET | `/api/animals/turtles` | 7 |
| GET | `/api/animals/twisters` | 4 |
| GET | `/api/animals/guinea-pigs` | 6 |
| GET | `/api/animals/chinchillas` | 4 |
| GET | `/api/animals/gerbils` | 4 |
| GET | `/api/animals/ferrets` | 4 |
| GET | `/api/animals/lizards` | 7 |

**Total no seed:** 132 animais.

### GET /api/animals/dogs

**Descrição:** Lista raças de cães com filtros opcionais.

**Query params:**
| Param | Tipo | Descrição |
|-------|------|-----------|
| search | string | Busca por nome |
| size | string | pequeno, médio, grande, gigante |
| energyLevel | string | baixo, moderado, alto, muito alto |
| apartmentFriendly | boolean | true/false |

**Response 200:** Array de `AnimalBreed`

**Erros:** 500 INTERNAL_ERROR

---

### GET /api/animals/dogs/:slug

**Descrição:** Detalhe pelo slug (ex: `labrador-retriever`, `persa` em `/cats/persa`).

Rotas equivalentes: `/api/animals/cats/:slug`, `/fish/:slug`, etc.

**Response 200:** `AnimalBreed` (inclui `imageUrl`, `imageAlt`, `imageCredit`, `imageSource`, `placeholderUrl`)

**Erros:**
- 404 BREED_NOT_FOUND

---

### POST /api/animals/seed

**Descrição:** Repopula todas as espécies (development only).

**Response 200:**
```json
{ "message": "Seed concluído", "count": 132 }
```

**Erros:**
- 403 SEED_NOT_ALLOWED (fora de development)

---

## Pets

Todos usam `DEMO_USER_ID` do `.env`.

### GET /api/pets

**Response 200:** Array de `PetProfile`

### POST /api/pets

`species` aceita `dog`, `cat`, `fish`, `hamster`, `bird`, `rabbit`, `turtle`, `twister`, `guinea_pig`, `chinchilla`, `gerbil`, `ferret`, `lizard` ou `other`.

**Body:**
```json
{
  "name": "Thor",
  "species": "dog",
  "breedSlug": "labrador-retriever",
  "ageMonths": 24,
  "weightKg": 30,
  "sex": "male",
  "neutered": true,
  "notes": "string",
  "photoUrl": "string"
}
```

**Response 201:** `PetProfile`

**Erros:** 400 VALIDATION_ERROR

### GET /api/pets/:id

**Response 200:** `PetProfile` | **404** PET_NOT_FOUND

### PUT /api/pets/:id

**Body:** Campos parciais de PetProfile

**Response 200:** `PetProfile` | **404** PET_NOT_FOUND

### DELETE /api/pets/:id

**Response 204** | **404** PET_NOT_FOUND

---

## Reminders

### GET /api/reminders

**Response 200:** Array de `Reminder` (ordenado por dueDate)

### POST /api/reminders

**Body:**
```json
{
  "petId": "optional-id",
  "type": "vaccine",
  "title": "Vacina V10",
  "dueDate": "2026-07-01",
  "recurrence": "yearly"
}
```

**Response 201:** `Reminder`

### GET /api/reminders/:id

**Response 200:** `Reminder` | **404** REMINDER_NOT_FOUND

### PUT /api/reminders/:id

**Response 200:** `Reminder` | **404** REMINDER_NOT_FOUND

### DELETE /api/reminders/:id

**Response 204** | **404** REMINDER_NOT_FOUND

### PATCH /api/reminders/:id/done

**Descrição:** Marca lembrete como concluído.

**Response 200:** `Reminder` | **404** REMINDER_NOT_FOUND

---

## Tutor Profile

Todos usam `DEMO_USER_ID` do `.env`. Um documento por usuário demo (upsert).

### GET /api/tutor-profile

**Descrição:** Retorna o perfil do tutor demo. Se ainda não existir, retorna objeto vazio com `userId`.

**Response 200:** `TutorProfile`

### PUT /api/tutor-profile

**Descrição:** Cria ou atualiza o perfil do tutor demo.

**Body:**
```json
{
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

**Response 200:** `TutorProfile`

**Erros:** 400 VALIDATION_ERROR

---

## Adoption

### POST /api/adoption/match

**Body:** `AdoptionMatchRequest`

**Response 200:** `AdoptionMatchResult`

Retorna perfil resumido do tutor, 3 raças de cães recomendadas, percentual de compatibilidade, rótulo de compatibilidade, imagem quando disponível, motivo da recomendação, pontos de atenção, alertas gerais e mensagem antiabandono.

Exemplo parcial:
```json
{
  "profile": "Tutor iniciante em apartamento com crianças",
  "recommendedBreeds": [
    {
      "name": "Shih Tzu",
      "slug": "shih-tzu",
      "imageUrl": "/images/dogs/shih-tzu.webp",
      "imageAlt": "Shih Tzu",
      "compatibilityScore": 88,
      "compatibilityLabel": "Alta compatibilidade",
      "reason": "Boa convivência com crianças. Adaptável a apartamento. Energia moderado, adequada ao seu perfil.",
      "attentionPoints": [
        "Ainda assim, confirme rotina, custos e temperamento individual antes da decisão."
      ]
    }
  ],
  "responsibilityAlerts": ["Como tutor iniciante, invista tempo em treinamento básico e socialização."],
  "antiAbandonmentMessage": "Adotar é assumir uma vida..."
}
```

**Erros:** 400 VALIDATION_ERROR

---

## Formato de erro

```json
{
  "error": {
    "message": "Mensagem amigável",
    "code": "ERROR_CODE"
  }
}
```
