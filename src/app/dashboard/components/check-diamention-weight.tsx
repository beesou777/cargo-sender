"use client";
import { Text, TextInput, Button, Group, Grid } from "@mantine/core";

export default function CheckDimensionWeight() {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-50">
      <Group align="center">
        <Text className="font-semibold text-[14px]">📏 Check dimensions & weight</Text>
      </Group>
      <Text size="sm" color="dimmed">
        Provide dimensions of your item to check what is the best option for shipping it.
      </Text>

      <Grid gutter="md" className="mt-4">
        <Grid.Col span={2}>
          <TextInput label="LENGTH" placeholder="cm" styles={{
            input:{
                padding:"8px 10px"
            },
            label: {
              fontSize: "12px"
            }
          }} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput label="WIDTH" placeholder="cm" styles={{
            input:{
                padding:"8px 10px"
            },
            label: {
              fontSize: "12px"
            }
          }} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput label="HEIGHT" placeholder="cm" styles={{
            input:{
                padding:"8px 10px"
            },
            label: {
              fontSize: "12px"
            }
          }} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput label="WEIGHT" placeholder="kg" styles={{
            input:{
                padding:"8px 10px"
            },
            label: {
              fontSize: "12px"
            }
          }} />
        </Grid.Col>
        <Grid.Col span={4} className="flex gap-2 ">
        <Button variant="default" className="bg-gray-200 text-black hover:bg-gray-300 h-full w-full">
          Clear fields
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800 h-full w-full">
          Check dimensions
        </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
