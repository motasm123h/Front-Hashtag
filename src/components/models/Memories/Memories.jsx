import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import './Memories.scss' ;

function Memories({ memoriesModelOpen, setMemoriesModelOpen }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                // opened={opened} 
                // onClose={close} 
                opened={memoriesModelOpen}
                onClose={()=>setMemoriesModelOpen(false)}
                title="Your Memories List !" 
                // centered
                >
                Modal content
            </Modal>

            {/* <Group position="center">
                <Button onClick={open}>Open centered Modal</Button>
            </Group> */}
        </>
    );
}
export default Memories;