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

**Descrição:** Detalhe de uma raça pelo slug.

**Response 200:** `AnimalBreed`

**Erros:**
- 404 BREED_NOT_FOUND

---

### POST /api/animals/seed

**Descrição:** Repopula raças (development only).

**Response 200:**
```json
{ "message": "Seed concluído", "count": 30 }
```

**Erros:**
- 403 SEED_NOT_ALLOWED (fora de development)

---

## Pets

Todos usam `DEMO_USER_ID` do `.env`.

### GET /api/pets

**Response 200:** Array de `PetProfile`

### POST /api/pets

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

## Adoption

### POST /api/adoption/match

**Body:** `AdoptionMatchRequest`

**Response 200:** `AdoptionMatchResult`

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
