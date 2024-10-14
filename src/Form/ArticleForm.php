<?php

namespace App\Form;

use App\Entity\Article;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticleForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Titre',
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Contenu',
            ])
            ->add('agent', ChoiceType::class, [
                'label'   => 'Agent',
                'choices' => [
                    'Agent 1' => 'agent1',
                    'Agent 2' => 'agent2',
                    'Agent 3' => 'agent3',
                    // Ajoute d'autres agents ici
                ],
            ])
            ->add('rating', IntegerType::class, [
                'label' => 'Note',
                'attr'  => ['min' => 1, 'max' => 5],
            ])
            ->add('image', TextType::class, [
                'label'    => 'URL de l\'image',
                'required' => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}
