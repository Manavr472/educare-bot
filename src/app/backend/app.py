from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

app = FastAPI()

model_name = "zijiechen156/DeepSeek-R1-Medical-CoT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

generator = pipeline("text-generation", model=model, tokenizer=tokenizer)
print("Model loaded successfully!")

class RequestData(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_text(data: RequestData):
    try:
        response = generator(data.prompt, max_length=100, truncation=True, num_return_sequences=1)
        return {"reply": response[0]["generated_text"]}
    except Exception as e:
        return {"reply": str(e)}
