# Docker Complete Guide & Command Cheatsheet

## What is Docker?

### Simple Explanation

Docker is like a **shipping container for software**. Just as shipping containers allow goods to be transported consistently across ships, trucks, and trains, Docker containers allow applications to run consistently across different computers, servers, and environments.

### Technical Definition

**Docker is a containerization platform that uses OS-level virtualization to package applications and their dependencies into lightweight, portable containers.** It leverages Linux kernel features like cgroups and namespaces to create isolated user-space instances.

### Why Docker Matters

- **Problem**: "It works on my machine" syndrome
- **Solution**: Docker ensures your app runs the same everywhere
- **Business Value**: Faster deployments, easier scaling, consistent environments

---

## Core Docker Concepts

### 1. **Container**

#### Simple Explanation

A **container** is like a **lightweight virtual machine** that runs your application. It includes everything needed: your code, libraries, system tools, and settings. Multiple containers can run on one computer without interfering with each other.

#### Technical Definition

**A container is a runtime instance of a Docker image that provides an isolated execution environment using Linux kernel namespaces and cgroups for resource isolation.**

#### Interview Points

- Containers share the host OS kernel (unlike VMs which have their own OS)
- Use less resources than VMs (no hypervisor overhead)
- Start in seconds vs minutes for VMs
- Provide process and network isolation

### 2. **Image**

#### Simple Explanation

An **image** is like a **template or blueprint** for creating containers. Think of it as a recipe that tells Docker exactly how to set up your application environment.

#### Technical Definition

**A Docker image is a read-only template consisting of layered filesystems that contains the application code, runtime, system tools, libraries, and settings needed to run an application.**

#### Interview Points

- Images are immutable (cannot be changed once created)
- Built using Dockerfile instructions
- Uses Union File System with copy-on-write mechanism
- Can be versioned using tags (e.g., `nginx:1.21.0`)

### 3. **Dockerfile**

#### Simple Explanation

A **Dockerfile** is a **text file with instructions** that tells Docker how to build your custom image step by step.

#### Technical Definition

**A Dockerfile is a declarative configuration file containing a series of instructions that Docker Engine executes to automatically build Docker images.**

#### Common Instructions

```dockerfile
FROM ubuntu:20.04        # Base image
RUN apt-get update       # Execute command during build
COPY . /app             # Copy files from host to image
WORKDIR /app            # Set working directory
EXPOSE 80               # Document port usage
CMD ["python", "app.py"] # Default command when container starts
```

### 4. **Registry (Docker Hub)**

#### Simple Explanation

**Docker Hub** is like an **app store for Docker images** where you can download pre-built images (like nginx, MySQL) or upload your own.

#### Technical Definition

**A Docker registry is a centralized repository for storing and distributing Docker images, with Docker Hub being the default public registry.**

### 5. **Volumes**

#### Simple Explanation

**Volumes** are like **external hard drives** for containers. They store data outside the container so it doesn't disappear when the container stops.

#### Technical Definition

**Docker volumes are persistent data storage mechanisms managed by Docker that exist outside the container's filesystem and survive container lifecycle events.**

#### Types of Storage

- **Volumes**: Docker-managed storage (preferred)
- **Bind mounts**: Direct host filesystem mapping
- **tmpfs**: In-memory storage

---

## Container vs Virtual Machine

| Aspect             | Container             | Virtual Machine         |
| ------------------ | --------------------- | ----------------------- |
| **OS**             | Shares host OS kernel | Has its own complete OS |
| **Size**           | MB (lightweight)      | GB (heavyweight)        |
| **Startup**        | Seconds               | Minutes                 |
| **Resource Usage** | Low overhead          | High overhead           |
| **Isolation**      | Process-level         | Hardware-level          |
| **Portability**    | High                  | Medium                  |

---

## Docker Architecture (Interview Important)

### Components

1. **Docker Client** - Command line interface (CLI)
2. **Docker Daemon** - Background service that manages containers
3. **Docker Engine** - Core runtime that creates and manages containers
4. **Docker Registry** - Storage for Docker images

### How It Works

```
Docker Client → Docker Daemon → Container Runtime → Linux Kernel
```

---

## Docker Command Cheatsheet

### Image Management

#### Pull an Image

**What it does**: Downloads an image from a registry to your local machine.

```bash
docker pull <image_name>[:<tag>]
```

**Examples:**

```bash
docker pull nginx                    # Latest version
docker pull nginx:1.21.0            # Specific version
docker pull mysql:8.0               # MySQL version 8.0
```

**Interview Tip**: Images are pulled layer by layer using content-addressable storage.

#### Build an Image

**What it does**: Creates a custom image from a Dockerfile.

```bash
docker build -t <image_name>:<tag> <path_to_dockerfile>
```

**Example:**

```bash
docker build -t my-app:v1.0 .       # Build from current directory
```

#### List Available Images

**What it does**: Shows all images stored locally.

```bash
docker images
# OR
docker image ls
```

#### Remove an Image

**What it does**: Deletes an image from local storage.

```bash
docker rmi <image_id_or_name>
```

**Examples:**

```bash
docker rmi nginx
docker rmi 4f380adfc10f
docker rmi nginx:1.21.0              # Remove specific tag
```

---

### Container Lifecycle Management

#### Run a Container

**What it does**: Creates and starts a new container from an image.

```bash
docker run [OPTIONS] <image_name> [COMMAND]
```

**Basic Examples:**

```bash
docker run hello-world               # Simple test
docker run ubuntu                    # Run Ubuntu container
docker run -d nginx                  # Run in background (detached)
```

**Advanced Examples:**

```bash
# Web server with port mapping and custom name
docker run -d -p 8080:80 --name my-nginx nginx

# Interactive Ubuntu with volume mount
docker run -it -v /host/data:/container/data ubuntu /bin/bash

# Environment variables and resource limits
docker run -d \
  --name mysql-db \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=secret \
  --memory="512m" \
  --cpus="1.0" \
  mysql:8.0
```

#### Common Run Options (Interview Important)

- `-d, --detach` - Run in background
- `-p, --publish` - Port mapping (host:container)
- `-v, --volume` - Volume mounting
- `-e, --env` - Environment variables
- `--name` - Container name
- `-it` - Interactive with TTY
- `--rm` - Auto-remove when stopped
- `--restart` - Restart policy (no, always, unless-stopped, on-failure)

#### Container States

**Interview Question**: "What are the different container states?"

1. **Created** - Container created but not started
2. **Running** - Container is executing
3. **Paused** - Container processes are suspended
4. **Stopped** - Container has exited
5. **Killed** - Container was forcefully terminated

---

### Container Monitoring & Inspection

#### List Containers

```bash
docker ps                           # Running containers only
docker ps -a                        # All containers (running + stopped)
docker ps -q                        # Only container IDs
```

#### View Container Details

```bash
docker inspect <container_name>     # Detailed JSON information
docker stats                        # Real-time resource usage
docker top <container_name>         # Running processes inside container
```

#### Container Logs

**What it does**: Shows output from container's main process.

```bash
docker logs <container_name>
docker logs -f <container_name>     # Follow logs (real-time)
docker logs --tail 50 <container_name>  # Last 50 lines
docker logs --since 2023-01-01 <container_name>  # Logs since date
```

#### Execute Commands in Running Container

**What it does**: Runs a command inside an already running container.

```bash
docker exec [OPTIONS] <container_name> <command>
```

**Examples:**

```bash
docker exec -it my-nginx /bin/bash  # Interactive shell
docker exec my-nginx ls -la /usr    # List directory
docker exec -u root my-nginx whoami # Run as specific user
```

---

### Container Control

#### Stop Container

**What it does**: Gracefully stops a container (sends SIGTERM, waits, then SIGKILL).

```bash
docker stop <container_name>        # Graceful stop (10 sec timeout)
docker stop -t 30 <container_name>  # Custom timeout
```

#### Kill Container

**What it does**: Immediately terminates container (sends SIGKILL).

```bash
docker kill <container_name>        # Force stop immediately
```

#### Restart Container

```bash
docker restart <container_name>     # Stop then start
```

#### Pause/Unpause Container

```bash
docker pause <container_name>       # Suspend all processes
docker unpause <container_name>     # Resume processes
```

#### Remove Containers

```bash
docker rm <container_name>          # Remove stopped container
docker rm -f <container_name>       # Force remove (stop + remove)
docker rm $(docker ps -aq)          # Remove all stopped containers
```

---

### Volume Management

#### Create Volume

```bash
docker volume create <volume_name>
```

#### List Volumes

```bash
docker volume ls
```

#### Inspect Volume

```bash
docker volume inspect <volume_name>
```

#### Volume Mounting Types

```bash
# Named Volume (Recommended)
docker run -v my-volume:/app/data nginx

# Bind Mount (Host directory)
docker run -v /host/path:/container/path nginx

# Anonymous Volume
docker run -v /container/path nginx

# Read-only mount
docker run -v my-volume:/app/data:ro nginx
```

---

### Network Management

#### List Networks

```bash
docker network ls
```

#### Create Custom Network

```bash
docker network create my-network
docker network create --driver bridge my-bridge-net
```

#### Run Container on Custom Network

```bash
docker run -d --network my-network --name app1 nginx
docker run -d --network my-network --name app2 mysql:8.0
```

**Interview Point**: Containers on same custom network can communicate using container names as hostnames.

---

### System Management & Cleanup

#### System Information

```bash
docker version                      # Docker version info
docker info                         # System-wide information
docker system df                    # Storage usage
```

#### Cleanup Commands

```bash
docker system prune                 # Remove unused data
docker system prune -a              # Remove ALL unused data
docker container prune              # Remove stopped containers
docker image prune                  # Remove dangling images
docker volume prune                 # Remove unused volumes
docker network prune               # Remove unused networks
```

---

## Docker Compose (Bonus)

### What is Docker Compose?

**Simple**: Tool for running **multiple containers** together as one application.
**Technical**: **Orchestration tool that uses YAML files to define and manage multi-container applications.**

### Example docker-compose.yml

```yaml
version: "3.8"
services:
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html

  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### Basic Compose Commands

```bash
docker-compose up -d                # Start all services
docker-compose down                 # Stop and remove all services
docker-compose ps                   # Show service status
docker-compose logs web             # View service logs
```

---

## Real-World Workflows

### 1. **Development Environment Setup**

```bash
# Pull development image
docker pull node:16

# Run interactive development container
docker run -it \
  --name dev-env \
  -v $(pwd):/workspace \
  -p 3000:3000 \
  node:16 /bin/bash

# Inside container: install dependencies and run app
npm install
npm start

# Container keeps running; you can exit and re-enter
docker exec -it dev-env /bin/bash
```

### 2. **Web Application Deployment**

```bash
# Build custom application image
docker build -t my-web-app:v1.0 .

# Run with proper configuration
docker run -d \
  --name production-app \
  -p 80:8080 \
  --restart unless-stopped \
  -v app-data:/data \
  -e NODE_ENV=production \
  my-web-app:v1.0

# Monitor application
docker logs -f production-app
docker stats production-app
```

### 3. **Database with Persistent Storage**

```bash
# Create dedicated volume for database
docker volume create postgres-data

# Run PostgreSQL with persistence
docker run -d \
  --name postgres-db \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_DB=myapp \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  postgres:13

# Connect to database
docker exec -it postgres-db psql -U admin -d myapp
```

---

## Interview Questions & Answers

### Q1: What's the difference between Docker and Virtual Machines?

**Answer**:

- **Containers** share the host OS kernel and use OS-level virtualization
- **VMs** run complete operating systems with hardware-level virtualization
- **Containers** are lighter (MB vs GB), faster startup (seconds vs minutes)
- **VMs** provide stronger isolation but higher resource overhead

### Q2: Explain Docker image layers.

**Answer**:

- Images are built using **layered architecture** with **Union File System**
- Each Dockerfile instruction creates a **new layer**
- Layers are **immutable** and **cacheable**
- **Copy-on-write**: Changes create new layers without modifying existing ones
- **Layer sharing**: Multiple images can share common base layers

### Q3: What happens when you run `docker run`?

**Answer**:

1. **Image Check**: Docker checks if image exists locally
2. **Image Pull**: If not found, pulls from registry
3. **Container Creation**: Creates new container from image
4. **Resource Allocation**: Allocates CPU, memory, network, storage
5. **Process Start**: Runs the specified command/entrypoint
6. **Namespace/Cgroup Setup**: Sets up isolation and resource limits

### Q4: How do you handle data persistence in containers?

**Answer**:

- **Volumes**: Docker-managed storage (preferred method)
- **Bind mounts**: Direct host directory mapping
- **Named volumes**: Easier to backup and migrate
- **Anonymous volumes**: Temporary data, cleaned up with container

### Q5: What's the difference between CMD and ENTRYPOINT?

**Answer**:

- **CMD**: Default command, can be overridden by docker run arguments
- **ENTRYPOINT**: Always executes, docker run arguments become parameters
- **Best Practice**: Use ENTRYPOINT for main command, CMD for default arguments

---

## Docker Best Practices

### For Development

1. **Use official base images** when possible
2. **Pin image versions** (avoid `latest` in production)
3. **Use multi-stage builds** to reduce image size
4. **Don't install unnecessary packages**
5. **Use .dockerignore** to exclude files from build context

### For Production

1. **Run as non-root user** for security
2. **Use specific tags**, not `latest`
3. **Implement health checks**
4. **Set resource limits** (--memory, --cpus)
5. **Use read-only filesystems** when possible
6. **Scan images for vulnerabilities**

### Security Best Practices

1. **Keep base images updated**
2. **Use minimal base images** (Alpine Linux)
3. **Don't store secrets in images**
4. **Use Docker secrets** for sensitive data
5. **Enable Docker Content Trust**

---

## Quick Reference Commands

| Category       | Task         | Command                             |
| -------------- | ------------ | ----------------------------------- |
| **Images**     | Pull         | `docker pull <image>`               |
|                | Build        | `docker build -t <name> .`          |
|                | List         | `docker images`                     |
|                | Remove       | `docker rmi <image>`                |
| **Containers** | Run          | `docker run <image>`                |
|                | List running | `docker ps`                         |
|                | List all     | `docker ps -a`                      |
|                | Stop         | `docker stop <container>`           |
|                | Remove       | `docker rm <container>`             |
|                | Execute      | `docker exec -it <container> <cmd>` |
|                | Logs         | `docker logs <container>`           |
| **System**     | Info         | `docker info`                       |
|                | Clean up     | `docker system prune`               |
|                | Stats        | `docker stats`                      |

---

## Advanced Concepts (Bonus)

### Container Orchestration

- **Docker Swarm**: Docker's native clustering solution
- **Kubernetes**: Industry-standard container orchestration
- **Docker Compose**: Multi-container applications

### CI/CD Integration

- **Build automation**: Automated image building in pipelines
- **Image scanning**: Security vulnerability detection
- **Registry integration**: Push/pull from private registries
- **Blue-green deployments**: Zero-downtime deployments

### Monitoring & Logging

- **Container logs**: Centralized logging solutions
- **Metrics collection**: Resource usage monitoring
- **Health checks**: Application availability monitoring
- **Distributed tracing**: Request flow tracking

This comprehensive guide covers both the fundamentals for beginners and the technical depth needed for interviews. Practice with the examples and gradually work through the more advanced concepts!
