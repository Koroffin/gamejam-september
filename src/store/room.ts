import { Vector3 } from "@babylonjs/core";
export class Room {
    floorPositions: Vector3[] = [];
    wallsPositions: { rotation: Vector3; position: Vector3; }[] = [];
    torchPositions: { rotation: Vector3; position: Vector3; }[] = [];
    width: number = 0;
    height: number = 0;
    exits: { direction: Vector3; position: Vector3; }[] = [];

    constructor(point: Vector3, direction: Vector3) {
        this.generateSize();
        this.exits = this.generateExits(point, direction);

        const { width, height } = this;
        console.log(`width: ${width}, height: ${height}`);

        const center = this.getCenter(point, direction);
        console.log("center: ", center, point, direction);

        const y = center.y;

        this.generateFloorPositions(center, y);

        // add walls
        const defaultRotation = new Vector3(0, 0, 0);
        for (let i = 0; i < width; i++) {
            const xPos = center.x + 2 * i;
            const zPos = center.z + height * 2;

            this.addWall({ rotation: defaultRotation, position: new Vector3(xPos, y, zPos) });
            
            const xNeg = center.x - 2 * i;
            if (xPos !== xNeg) {
                this.addWall({ rotation: defaultRotation, position: new Vector3(xNeg, y, zPos) });
            }
            const zNeg = center.z - height * 2 + 2;
            if (zPos !== zNeg) {
                this.addWall({ rotation: defaultRotation, position: new Vector3(xPos, y, zNeg) });
            }
            if (xPos !== xNeg && zPos !== zNeg) {
                this.addWall({ rotation: defaultRotation, position: new Vector3(xNeg, y, zNeg) });
            }

            // add torches
            if (i % 2 === 0 && i !== width - 1 && i !== 0) {
                this.torchPositions.push({ rotation: defaultRotation, position: new Vector3(xPos, y + 2, zNeg - 0.9) });
                if (xPos !== xNeg) {
                    this.torchPositions.push({ rotation: defaultRotation, position: new Vector3(xNeg, y + 2, zNeg - 0.9) });
                }
            }
            if (i % 2 === 1 && i !== width - 1) {
                this.torchPositions.push({ rotation: new Vector3(defaultRotation.x, defaultRotation.y + Math.PI, defaultRotation.z), position: new Vector3(xPos, y + 2, zPos - 1.33) });
                if (xPos !== xNeg) {
                    this.torchPositions.push({ rotation: new Vector3(defaultRotation.x, defaultRotation.y + Math.PI, defaultRotation.z), position: new Vector3(xNeg, y + 2, zPos - 1.33) });
                }
            }
        }

        const rotatedRotation = new Vector3(0, Math.PI / 2, 0);
        for (let i = 0; i < height; i++) {
            const xPos = center.x + width * 2;
            const zPos = center.z + 2 * i;
            this.addWall({ rotation: rotatedRotation, position: new Vector3(xPos, y, zPos) });
            const xNeg = center.x - width * 2 + 2;
            if (xPos !== xNeg) {
                this.addWall({ rotation: rotatedRotation, position: new Vector3(xNeg, y, zPos) });
            }
            const zNeg = center.z - 2 * i;
            if (zPos !== zNeg) {
                this.addWall({ rotation: rotatedRotation, position: new Vector3(xPos, y, zNeg) });
            }
            if (xPos !== xNeg && zPos !== zNeg) {
                this.addWall({ rotation: rotatedRotation, position: new Vector3(xNeg, y, zNeg) });
            }

            // add torches
            if (i % 2 === 0 && i !== height - 1 && i !== 0) {
                this.torchPositions.push({ rotation: rotatedRotation, position: new Vector3(xNeg - 0.89, y + 2, zNeg) });
                if (zPos !== zNeg) {
                    this.torchPositions.push({ rotation: rotatedRotation, position: new Vector3(xNeg - 0.89, y + 2, zPos) });
                }
            }
            if (i % 2 === 1 && i !== height - 1) {
                this.torchPositions.push({ rotation: new Vector3(defaultRotation.x, rotatedRotation.y + Math.PI, defaultRotation.z), position: new Vector3(xPos - 1.28, y + 2, zNeg) });
                if (zPos !== zNeg) {
                    this.torchPositions.push({ rotation: new Vector3(defaultRotation.x, rotatedRotation.y + Math.PI, defaultRotation.z), position: new Vector3(xPos - 1.28, y + 2, zPos) });
                }
            }
        }
    }
    generateSize() {
        const width = Math.floor(Math.random() * 4) + 4;
        const height = Math.floor(Math.random() * 4) + 4;

        this.width = width;
        this.height = height;
    }
    getCenter(point: Vector3, direction: Vector3) {
        const { width, height } = this;
        const center = new Vector3(point.x + direction.x * width * 2, point.y, point.z + direction.z * height * 2);
        return center;
    }
    generateExits(point: Vector3, direction: Vector3) {
        const center = this.getCenter(point, direction);
        const { width, height } = this;
        return [
            { direction: new Vector3(0, 0, 1), position: new Vector3(center.x, center.y, center.z + height * 2) },
            { direction: new Vector3(0, 0, -1), position: new Vector3(center.x, center.y, center.z - height * 2 + 2) },
            { direction: new Vector3(1, 0, 0), position: new Vector3(center.x + width * 2, center.y, center.z) },
            { direction: new Vector3(-1, 0, 0), position: new Vector3(center.x - width * 2 + 2, center.y, center.z) },
        ];
    }
    generateFloorPositions(center: Vector3, y: number) {
        const { width, height } = this;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const xPos = center.x + 2 * i;
                const zPos = center.z + 2 * j;
                const xNeg = center.x - 2 * i;
                const zNeg = center.z - 2 * j;

                this.floorPositions.push(new Vector3(xPos, y, zPos));

                if (xPos !== xNeg) {
                    this.floorPositions.push(new Vector3(xNeg, y, zPos));
                }
                if (zPos !== zNeg) {
                    this.floorPositions.push(new Vector3(xPos, y, zNeg));
                }
                if (xPos !== xNeg && zPos !== zNeg) {
                    this.floorPositions.push(new Vector3(xNeg, y, zNeg));
                }
            }
        }
    }
    hasExitAt(point: Vector3) {
        return this.exits.some((exit) => exit.position.equals(point));
    }
    addWall({ position, rotation } : { position: Vector3; rotation: Vector3 }) {
        if (this.hasExitAt(position)) return;

        this.wallsPositions.push({ position, rotation });
    }
    getNeighboringRooms() {
        return this.exits.map(({ position, direction}, index) => {
            // idk how to fix it other way, just a dirty hack for now
            if (index === 0) {
                position = new Vector3(position.x, position.y, position.z - 2);
            }
            if (index === 2) {
                position = new Vector3(position.x - 2, position.y, position.z);
            }
            return new Room(position, direction);
        });
    }
}