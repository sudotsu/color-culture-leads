# backend/Dockerfile

# 1. Use a lightweight Python base
FROM python:3.10-slim

# 2. Install system dependencies required for OpenCV
# (This is the critical step for CV apps on the cloud)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 3. Set work directory
WORKDIR /app

# 4. Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the application code
COPY . .

# 6. Expose the port
EXPOSE 8000

# 7. Command to run the API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]